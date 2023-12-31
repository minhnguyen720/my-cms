import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './dto/authenticate.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { Users } from 'src/schemas/users.schema';
import { ResetPassDto } from './dto/reset-pass.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async resetPassword(body: ResetPassDto) {
    try {
      const hash = this.usersService.hashData(body.password);
      const user = await this.usersService.findOneByEmail(body.email);
      await user.updateOne({
        password: hash,
      });
      this.logger.log(`Reset password success for user ${user.id}`);
      return {
        isSuccess: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async checkEmail(email: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user === null || user === undefined)
        return {
          isValid: false,
        };
      return {
        isValid: true,
        user,
      };
    } catch (error) {
      return {
        isValid: false,
      };
    }
  }

  async getApiKey(userId) {
    try {
      const user = await this.usersService.findUserById(userId);
      if (user)
        return {
          apikey: user.apikey,
        };
      else {
        throw 'User not found';
      }
    } catch (error) {
      this.logger.error(error);
      return {
        apikey: undefined,
      };
    }
  }

  async isUserExist(body) {
    return await this.usersService.isUserExist(body);
  }

  async getProfile(userId: string) {
    try {
      return await this.usersService.findUserById(userId);
    } catch (error) {
      return {
        isFalse: true,
        message: 'Authenticate user fail. Please try again',
      };
    }
  }

  async authenticate(
    userId: string,
  ): Promise<{ user: Users | undefined; isAuth: boolean }> {
    try {
      this.logger.log('Running authenticate service');
      const user = await this.usersService.findUserById(userId);

      return {
        user: user,
        isAuth: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        user: undefined,
        isAuth: false,
      };
    }
  }

  async getProfileAtom(userId: string) {
    return await this.usersService.initUserAtom(userId);
  }

  async signout(userId: string) {
    await this.usersService.removeRtHash(userId);
  }

  async refresh(userId: string, rt: string) {
    const user = await this.usersService.findUserById(userId);

    if (user.hashedRefreshToken === null) throw 'Token is null';
    const isRtMatched = await bcrypt.compare(rt, user.hashedRefreshToken);
    if (!isRtMatched) throw 'Access denied';

    const tokens = await this.generateToken(
      user.id,
      user.username,
      user.email,
      user.name,
    );
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

      const tokens = await this.generateToken(
        user.id,
        user.username,
        user.email,
        user.name,
      );
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

  getConfirmCode() {
    return Math.floor(Math.random() * 100000).toString();
  }

  async signup(authDto: AuthenticateDto): Promise<{
    user: Users | undefined;
    isSuccess: boolean;
    tokens: Tokens | undefined;
    message: string;
  }> {
    try {
      const res: { isSuccess: boolean; user: Users; message: string } =
        await this.usersService.createNewUser(authDto);

      if (res.isSuccess) {
        const user = res.user;
        const tokens = await this.generateToken(
          user.id,
          user.username,
          user.email,
          user.name,
        );
        await this.usersService.updateRtHash(user.id, tokens.refresh_token);

        return {
          user: user,
          message: '',
          isSuccess: true,
          tokens: tokens, // for auto login after signup
        };
      } else {
        return {
          user: undefined,
          tokens: undefined,
          isSuccess: false,
          message: res.message,
        };
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  // add role to param when moving to access control part
  async generateToken(
    userId: string,
    username: string,
    userEmail: string,
    name: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          userEmail,
          name,
        },
        {
          secret: process.env.JWT_CONSTANT,
          expiresIn: 60 * 60 * 6,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          userEmail,
          name,
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
