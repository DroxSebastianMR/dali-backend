import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import ms, { StringValue } from 'ms';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  private hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async create(userId: number) {
    const token = randomUUID();
    const tokenHash = this.hash(token);

    const expiresRaw = process.env.JWT_REFRESH_EXPIRES;

    if (!expiresRaw) {
      throw new Error('JWT_REFRESH_EXPIRES no definido');
    }

    const expiresInMs = ms(expiresRaw as StringValue);

    if (typeof expiresInMs !== 'number') {
      throw new Error(`Formato inválido de duración: ${expiresRaw}`);
    }

    await this.prisma.refreshToken.create({
      data: {
        user_id: userId,
        token_hash: tokenHash,
        expires_at: new Date(Date.now() + expiresInMs),
      },
    });

    return token;
  }

  async validate(token: string) {
    const tokenHash = this.hash(token);

    const stored = await this.prisma.refreshToken.findFirst({
      where: {
        token_hash: tokenHash,
        is_revoked: false,
        expires_at: {
          gt: new Date(),
        },
      },
    });

    if (!stored) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return stored;
  }

  async rotate(token: string) {
    const stored = await this.validate(token);

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: {
        is_revoked: true,
        revoked_at: new Date(),
      },
    });

    return this.create(stored.user_id);
  }

  async revoke(token: string) {
    const tokenHash = this.hash(token);

    const result = await this.prisma.refreshToken.updateMany({
      where: {
        token_hash: tokenHash,
        is_revoked: false,
      },
      data: {
        is_revoked: true,
        revoked_at: new Date(),
      },
    });

    if (result.count === 0) {
      throw new UnauthorizedException('Token Inválido');
    }
  }
}
