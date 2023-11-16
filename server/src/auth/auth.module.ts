import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { MailModule } from 'src/mail/mail.module';
import { ConfirmationModule } from 'src/confirmation/confirmation.module';
import { PageModule } from 'src/page/page.module';
import { ProjectModule } from 'src/project/project.module';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    PassportModule,
    MailModule,
    ConfirmationModule,
    PageModule,
    ProjectModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
