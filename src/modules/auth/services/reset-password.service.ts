import { PrismaService } from "@/common/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ResetPasswordInput } from "../schema/reset-password.schema";
import { createHash } from "crypto";
import { hashPassword } from "@/common/prisma/utils/password.util";


@Injectable()

export class ResetPasswordService {
  constructor(private prisma: PrismaService) {}

  async resetPassword({ token, new_password }: ResetPasswordInput) {
    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex');

    const resetToken = await this.prisma.resetPasswordToken.findUnique({
      where: {
        token_hash: tokenHash,
      },
    });

    if (!resetToken) {
      throw new BadRequestException('Token inválido');
    }

    if (resetToken.used_at) {
      throw new BadRequestException('Token ya utilizado');
    }

    if (resetToken.expires_at < new Date()) {
      throw new BadRequestException('Token expirado');
    }

    const newHash = await hashPassword(new_password);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.user_id },
        data: { password_hash: newHash },
      }),
      this.prisma.resetPasswordToken.updateMany({
        where: {
          user_id: resetToken.user_id,
          used_at: null,
        },
        data: {
          used_at: new Date(),
        },
      }),
      this.prisma.refreshToken.updateMany({
        where: {
          user_id: resetToken.user_id,
          is_revoked: false,
        },
        data: {
          is_revoked: true,
          revoked_at: new Date(),
        },
      }),
    ]);

    return {
      status: 'OK',
      message: 'Contraseña actualizada correctamente',
    }
  }
}