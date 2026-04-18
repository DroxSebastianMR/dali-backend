import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      // secret: 'SECRET_KEY', // luego usa env
      // signOptions: { expiresIn: '15m' },

      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}