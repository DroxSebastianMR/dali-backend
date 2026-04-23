import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './services/refresh-token.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { LogoutService } from './services/logout.service';
import { RecoverPasswordController } from './controllers/recover-password.controller';
import { RecoverdPasswordService } from './services/recover-password.service';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { ResetPasswordService } from './services/reset-password.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  controllers: [AuthController, RecoverPasswordController, ResetPasswordController],
  providers: [AuthService, PrismaService, RefreshTokenService, TokenService, 
    LoginService, PasswordService, LogoutService,
    RecoverdPasswordService, ResetPasswordService],
})
export class AuthModule {}