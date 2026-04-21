import { PrismaService } from "@/common/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PasswordService } from "@/modules/auth/services/password.service";
import { TokenService } from "@/modules/auth/services/token.service";
import { RefreshTokenService } from "@/modules/auth/services/refresh-token.service";
import { LoginUserDto } from "@/modules/auth/dtos/login-user.dto";
import { User, UserStatus } from "@prisma/client";
import { mapAuthResponse } from "../mappers/auth-response.mapper";
import { UserWithRoles } from "../types/user.types";

type JwtPayload = {
  sub: number;
  email: string;
};

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.validateUser(email, password);
    const tokens = await this.generateTokens(user);
    await this.updateLastLogin(user.id);

    return mapAuthResponse(user, tokens.accessToken, tokens.refreshToken);
  }

  private async validateUser(email: string, password: string): Promise<UserWithRoles> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (
      !user ||
      user.estado !== UserStatus.active ||
      !user.password_hash
    ) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const isValid = await this.passwordService.compare(
      password,
      user.password_hash,
    );

    if (!isValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    return user;
  }

  private async generateTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.tokenService.signAccessToken(payload);
    const refreshToken = await this.refreshTokenService.create(user.id);

    return { accessToken, refreshToken };
  }

  private async updateLastLogin(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        last_login_at: new Date(),
      },
    });
  }
}