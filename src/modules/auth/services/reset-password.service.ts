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

        const resetToken = await this.prisma.resetPasswordToken.findFirst({
            where: {
                token_hash: tokenHash,
                used_at: null,
                expires_at: {
                    gt: new Date(),
                },
            },
        });

        if (!resetToken) {
            throw new BadRequestException('Token inválido o expirado');
        }

        const newHash = await hashPassword(new_password);

        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: resetToken.user_id },
                data: { password_hash: newHash },
            }),
            this.prisma.resetPasswordToken.update({
                where: { id: resetToken.id },
                data: { used_at: new Date(), }
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
        ]);

        return {
            status: 'OK',
            message: 'Contraseña actualizada correctamente',
        }
    }
}