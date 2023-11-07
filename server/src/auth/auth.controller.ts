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
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('public')
  getPublicData() {
    return 'hello world';
  }

  // @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('authenticate')
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return await this.authService.authenticate(
      authenticateDto.username,
      authenticateDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() authDto: AuthenticateDto) {
    return await this.authService.signup(authDto);
  }
}
