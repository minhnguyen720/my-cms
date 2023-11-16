import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
import { Users } from 'src/schemas/users.schema';
import { MailService } from 'src/mail/mail.service';
import { Tokens } from './types';
import { ConfirmationService } from 'src/confirmation/confirmation.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly confirmService: ConfirmationService,
  ) {}

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

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @GetCurrentUserId() userId: string,
  ): Promise<{ user: Users | undefined; isAuth: boolean }> {
    return await this.authService.authenticate(userId);
  }

  @Get('key')
  async getApiKey(@GetCurrentUserId() userId) {
    return await this.authService.getApiKey(userId);
  }

  @Public()
  @Post('user-exist')
  async checkUserExistence(@Body() body) {
    const { isSuccess, message } = await this.authService.isUserExist(body);
    return {
      isSuccess,
      message,
    };
  }

  @Public()
  @Post('request-code')
  async getConfirmCode(@Body() user) {
    const code = this.authService.getConfirmCode();
    await Promise.all([
      this.mailService.sendUserConfirmationCode(user, code),
      this.confirmService.createNewRecord(code, user.email),
    ]);
  }

  @Public()
  @Post('submit-code')
  async compareCode(@Body() body: { code: string; email: string }) {
    const result: boolean = await this.confirmService.compareCode(
      body.code,
      body.email,
    );
    return { isSuccess: result };
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() authDto: AuthenticateDto) {
    const res: {
      user: Users;
      isSuccess: boolean;
      tokens: Tokens;
    } = await this.authService.signup(authDto);
    // if (res.isSuccess) {
    //   await this.mailService.sendUserConfirmationCode(
    //     res.user,
    //     res.tokens.access_token,
    //   );
    // }

    return res;
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
