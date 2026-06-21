import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RefreshTokenInput } from '@/modules/auth/schema/refresh-token.schema';
import { RefreshTokenService } from './refresh-token.service';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserStatus } from '@prisma/client';
import { SocialLoginService } from './social-login.service';
import { SocialProvider } from '@/modules/auth/enums/social-provider.enum';
import { SocialLoginDTO } from '../dtos/social-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: TokenService,
    private readonly loginService: LoginService,
    private readonly socialLoginService: SocialLoginService,
  ) {}

  async login(data: LoginUserDto) {
    return this.loginService.login(data);
  }

  async refreshToken(data: RefreshTokenInput) {
    const { refresh_token } = data;

    const stored = await this.refreshTokenService.validate(refresh_token);

    const user = await this.prisma.user.findUnique({
      where: { id: stored.user_id },
    });

    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User not valid');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = this.tokenService.signAccessToken(payload);

    const new_refresh_token =
      await this.refreshTokenService.rotate(refresh_token);

    return {
      access_token,
      refresh_token: new_refresh_token,
    };
  }
  async socialLogin(dto: SocialLoginDTO) {
    switch (dto.provider) {
      case SocialProvider.GOOGLE:
        return this.socialLoginService.loginWithGoogle(dto.token);

      case SocialProvider.FACEBOOK:
        throw new Error('Not implemented');

      case SocialProvider.APPLE:
        throw new Error('Not implemented');
    }
  }
}
