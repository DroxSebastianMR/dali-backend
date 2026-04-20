import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './services/refresh-token.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RefreshTokenService, LoginService, TokenService, PasswordService],
})
export class AuthModule {}