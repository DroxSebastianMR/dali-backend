import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { createHash, randomUUID } from "crypto";
import ms, { StringValue } from 'ms';


@Injectable()

export class RefreshTokenService {
    constructor(private readonly prisma: PrismaService) {}
    
    // hash deterministico
    private hash(token: string): string {
        return createHash('sha256').update(token).digest('hex');
    }

    // crear refresh token
    async create(userId: number) {
        const token = randomUUID();
        const tokenHash = this.hash(token);

        const expiresRaw = process.env.JWT_REFRESH_EXPIRES;

        if (!expiresRaw){
            throw new Error('JWT_REFRESH_EXPIRES no definido');
        }

        const expiresInMs = ms(expiresRaw as StringValue);

        if (typeof expiresInMs !== 'number'){
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
}