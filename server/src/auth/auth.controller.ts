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
  async getProfile(@GetCurrentUserId() userId: string) {
    return await this.authService.getProfile(userId);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() authDto: AuthenticateDto) {
    return await this.authService.signin(authDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') rt: string,
  ): Promise<{ isAuth: boolean }> {
    return await this.authService.authenticate(userId, rt);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() authDto: AuthenticateDto) {
    return await this.authService.signup(authDto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
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
