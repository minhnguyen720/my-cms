import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './dto/authenticate.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async getProfile(userId: string) {
    try {
      const user = await this.usersService.findUserById(userId);
      return {
        username: user.username,
        userId: user.id,
      };
    } catch (error) {
      return {
        isFalse: true,
        message: 'Authenticate user fail. Please try again',
      };
    }
  }

  async authenticate(userId: string, rt: string): Promise<{ isAuth: boolean }> {
    try {
      if (rt === undefined || rt === null) throw 'Refresh token is invalid';

      const user = await this.usersService.findUserById(userId);
      const isRtMatched = await bcrypt.compare(rt, user.hashedRefreshToken);
      if (!isRtMatched) throw 'Access denied';

      return {
        isAuth: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isAuth: false,
      };
    }
  }

  async signout(userId: string) {
    await this.usersService.removeRtHash(userId);
  }

  async refresh(userId: string, rt: string) {
    const user = await this.usersService.findUserById(userId);

    if (user.hashedRefreshToken === null) throw 'Token is null';
    const isRtMatched = await bcrypt.compare(rt, user.hashedRefreshToken);
    if (!isRtMatched) throw 'Access denied';

    const tokens = await this.generateToken(user.id, user.username);
    await this.usersService.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signin(
    authDto: AuthenticateDto,
  ): Promise<Tokens | { isFalse: boolean; message: string }> {
    try {
      const user = await this.usersService.findOne(authDto.username);

      if (!bcrypt.compareSync(authDto.password, user.password))
        throw 'Wrong password';

      const tokens = await this.generateToken(user.id, user.username);
      await this.usersService.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      this.logger.error(error);
      return {
        isFalse: true,
        message: 'Wrong username or password. Please try again',
      };
    }
  }

  async signup(authDto: AuthenticateDto): Promise<Tokens> {
    try {
      const user = await this.usersService.createNewUser(authDto);
      const tokens = await this.generateToken(user.id, user.username);
      await this.usersService.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // add role to param when moving to access control part
  async generateToken(userId: string, username: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_CONSTANT,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_CONSTANT,
          expiresIn: 60 * 60 * 24 * 7, // a week
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
