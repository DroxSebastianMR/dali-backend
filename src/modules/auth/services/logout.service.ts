import { Injectable } from "@nestjs/common";
import { RefreshTokenService } from "@/modules/auth/services/refresh-token.service";

@Injectable()

export class LogoutService {
    constructor(private readonly refreshTokenService: RefreshTokenService,) { }

    async logout(refreshToken: string) {
        await this.refreshTokenService.revoke(refreshToken);

        return {
            status: 'OK',
            message: 'Logout Exitoso',
        };
    }
}