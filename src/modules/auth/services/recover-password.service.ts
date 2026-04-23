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

        const token = randomBytes(32).toString('hex');
        const tokenHash = createHash('sha256').update(token).digest('hex');

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

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