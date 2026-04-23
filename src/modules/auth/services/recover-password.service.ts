import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { randomBytes, createHash } from 'crypto';
import { RecoverPasswordInput } from "../schema/recover-password.schema";


@Injectable()
export class RecoverdPasswordService {
    constructor(private prisma: PrismaService) {}

    async recoverPassword({ email }: RecoverPasswordInput){
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if( !user ) {
            return {
                status: 'OK',
                message: 'Si el correo existe, se enviara un enlace de recuperación',
            }
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

        const token = Math.random().toString(36).substring(2, 8).toUpperCase();
        const tokenHash = createHash('sha256').update(token).digest('hex');

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15);

        await this.prisma.resetPasswordToken.create({
            data: {
                user_id: user.id,
                token_hash: tokenHash,
                expires_at: expires,
            }
        });

                ///// PARA VER EL TOKEN (NO DEBE ESTAR EN PRODUCCION, NUNCA NUNCA NUNCA ) ////////
        const isDev = process.env.NODE_ENV !== 'production';

        if (isDev) {
        console.log('[RESET TOKEN]', token);
        }
        ///////////////////////////////////////////////////////////////////////////////////

        return {
            status: 'OK',
            message: 'Si el correo existe, se enviará un enlace de recuperación'
        }
    }
}