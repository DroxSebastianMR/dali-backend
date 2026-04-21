import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RefreshTokenService } from "./refresh-token.service";
import * as bcrypt from 'bcrypt';

@Injectable()

export class LogoutService {
    constructor(private readonly refreshTokenService: RefreshTokenService,) {}

    async logout(refreshToken: string) {
        await this.refreshTokenService.revoke(refreshToken);
        
        return{
            message: 'OK. Logout Exitoso',
        };
    }
}