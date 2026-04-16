import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RefreshTokenInput } from '@/modules/auth/schema/refresh-token.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async refreshToken(data: RefreshTokenInput) {
    const { refresh_token } = data;
    const storedTokens = await this.prisma.refreshToken.findMany({
      where: {
        is_revoked: false,
        expires_at: {
          gt: new Date(),
        },
      },
    });
    let validToken = null;
    for (const token of storedTokens) {
      const isMatch = await bcrypt.compare(
        refresh_token,
        token.token_hash,
      );

      if (isMatch) {
        validToken = token;
        break;
      }
    }

    if (!validToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: validToken.user_id },
    });

    if (!user || user.estado !== 'ACTIVE') {
      throw new UnauthorizedException('User not valid');
    }
    const newAccessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    await this.prisma.refreshToken.update({
      where: { id: validToken.id },
      data: {
        is_revoked: true,
        revoked_at: new Date(),
      },
    });

    const newRefreshToken = this.generateRefreshToken();

    const hashed = await bcrypt.hash(newRefreshToken, 10);

    await this.prisma.refreshToken.create({
      data: {
        user_id: user.id,
        token_hash: hashed,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
  private generateRefreshToken(): string {
    return crypto.randomUUID();
  }
}