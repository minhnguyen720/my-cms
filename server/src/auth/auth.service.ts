import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './dto/authenticate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async authenticate(username: string, password: string) {
    try {
      const user = await this.usersService.findOne(username);

      // use bycrypt to decode password later
      if (!bcrypt.compareSync(password, user.password)) {
        throw 'Wrong password';
      }

      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_CONSTANT,
        }),
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async signup(authDto: AuthenticateDto) {
    return await this.usersService.createNewUser(authDto);
  }
}
