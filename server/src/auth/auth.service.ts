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

  async authenticate(authDto: AuthenticateDto): Promise<Tokens> {
    try {
      const user = await this.usersService.findOne(authDto.username);

      if (!bcrypt.compareSync(authDto.password, user.password))
        throw 'Wrong password';

      const tokens = await this.generateToken(user.id, user.username);
      await this.usersService.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      this.logger.error(error);
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
