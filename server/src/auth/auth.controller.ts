import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
