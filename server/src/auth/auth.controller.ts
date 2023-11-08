import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';

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

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@GetCurrentUserId() userId: string) {
    this.authService.signout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    return await this.authService.refresh(userId, rt);
  }
}
