import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { GoogleProvider } from '../providers/google.provider';
import { TokenService } from './token.service';
import { RefreshTokenService } from './refresh-token.service';
import { mapAuthResponse } from '../mappers/auth-response.mapper';
import { UserStatus } from '@prisma/client';

@Injectable()
export class SocialLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleProvider: GoogleProvider,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async loginWithGoogle(token: string) {
    const payload = await this.googleProvider.verifyToken(token);

    if (!payload?.email) {
      throw new UnauthorizedException('Google token inválido');
    }

    const include = {
      user_roles: {
        include: {
          role: true,
        },
      },
      owned_businesses: true,
    };

    // 1. Buscar usuario
    let user = await this.prisma.user.findUnique({
      where: { email: payload.email },
      include,
    });

    // 2. Crear si no existe
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: payload.email,
          first_name: payload.given_name ?? '',
          last_name: payload.family_name ?? '',
          status: UserStatus.ACTIVE,

          // 🔥 CORRECTO SEGÚN TU MODEL:
          email_verified: true,
        },
        include,
      });
    }

    // 3. Ya TS sabe que user existe aquí
    const accessToken = this.tokenService.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    const refreshToken = await this.refreshTokenService.create(user.id);

    return mapAuthResponse(user, accessToken, refreshToken);
  }
}
