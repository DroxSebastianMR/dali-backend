import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { RefreshTokenService } from "./refresh-token.service";
import { LoginUserDto } from "../dtos/login-user.dto";
import { UserStatus } from "@prisma/client";


@Injectable()

export class LoginService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService,
        private readonly refreshTokenService: RefreshTokenService,
    ) {}

    async login(data: LoginUserDto) {
        const { email, password } = data;

        // busca usuario
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.estado !== UserStatus.active){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        if (!user?.password_hash){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // validar password
        const isValid = await this.passwordService.compare(
            password,
            user.password_hash,
        );

        if(!isValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // payload
        const payload = {
            sub: user.id,
            email: user.email,
        };

        // generar tokens
        const accessToken = this.tokenService.signAccessToken(payload);
        const refreshToken = await this.refreshTokenService.create(user.id);

        // actualizar ultimo login
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                last_login_at: new Date(),
            },
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    telefono: user.telefono,
                    foto_url: user.foto_url,
                    estado: user.estado,
                    email_verified: user.email_verified,
                    telefono_verified: user.telefono_verified,
            },
        };
    }
}