import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenService } from './services/refresh-token.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { LogoutService } from './services/logout.service';
import { RecoverPasswordService } from './services/recover-password.service';
import { ResetPasswordService } from './services/reset-password.service';
import { EmailModule } from '../email/email.module';
import { VerifyResetTokenService } from './services/verify-reset-token.service';
import { SocialLoginService } from './services/social-login.service';
import { GoogleProvider } from './providers/google.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    RefreshTokenService,
    LogoutService,
    LoginService,
    TokenService,
    PasswordService,
    RecoverPasswordService,
    VerifyResetTokenService,
    ResetPasswordService,
    JwtStrategy,
    SocialLoginService,
    GoogleProvider,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
