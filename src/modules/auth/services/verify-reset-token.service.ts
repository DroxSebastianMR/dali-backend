import { PrismaService } from "@/common/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { VerifyResetTokenInput } from "../schema/verify-reset-token.schema";
import { createHash } from "crypto";

@Injectable()
export class VerifyResetTokenService {
    constructor(private prisma: PrismaService) {}
    async verifyToken({ token }: VerifyResetTokenInput) {
      const tokenHash = createHash('sha256')
          .update(token)
          .digest('hex');
      
      const resetToken = await this.prisma.resetPasswordToken.findUnique({
          where: {
              token_hash: tokenHash,
          },
      });

      if (!resetToken) {
        return {
          valid: false,
          reason: "invalid",
          message: "Token inválido",
        };
      }

      if (resetToken.used_at) {
        return {
          valid: false,
          reason: "used",
          message: "Token ya utilizado",
        };
      }

      if (resetToken.expires_at < new Date()) {
        return {
          valid: false,
          reason: "expired",
          message: "Token expirado",
        };
      }

      return {
        valid: true,
        message: "Token válido",
      };
    }
}