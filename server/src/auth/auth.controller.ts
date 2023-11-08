import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('authenticate')
  async authenticate(@Body() authDto: AuthenticateDto) {
    return await this.authService.authenticate(authDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() authDto: AuthenticateDto) {
    return await this.authService.signup(authDto);
  }

  @Post('signout')
  signout(@Body() body) {
    this.authService.signout(body.userId);
  }
}
