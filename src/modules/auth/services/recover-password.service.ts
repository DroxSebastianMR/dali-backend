import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { createHash } from "crypto";
import { RecoverPasswordInput } from "@/modules/auth/schema/recover-password.schema";
import { EmailService } from "@/modules/email/services/email.service";
import { recoveryPasswordTemplate } from "@/modules/email/templates/recovery-password.template";

@Injectable()
export class RecoverPasswordService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async recoverPassword({ email }: RecoverPasswordInput) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        status: "OK",
        message: "Si el correo existe, se enviará un código de recuperación",
      };
    }

    await this.prisma.resetPasswordToken.updateMany({
      where: {
        user_id: user.id,
        used_at: null,
      },
      data: {
        used_at: new Date(),
      },
    });

    const code = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const tokenHash = createHash("sha256")
      .update(code)
      .digest("hex");

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15);

    // 💾 guardar en DB
    await this.prisma.resetPasswordToken.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expires,
      },
    });

    const html = recoveryPasswordTemplate({
      name: user.first_name ?? "Usuario",
      code,
    });

    await this.emailService.sendEmail({
      to: user.email,
      subject: "Código de recuperación de contraseña",
      html,
    });

    return {
      status: "OK",
      message: "Si el correo existe, se enviará un código de recuperación",
    };
  }
}