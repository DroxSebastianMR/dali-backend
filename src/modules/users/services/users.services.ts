import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { mapAuthorization } from '@/modules/auth/mappers/authorization.mapper';
import { mapMeta } from '@/modules/auth/mappers/meta.mapper';
import { mapUser } from '@/modules/auth/mappers/user.mapper';

import { UserStatus } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async me(userId: number) {
    const user = await this.findActiveUserById(userId);

    return this.buildMeResponse(user);
  }

  private async findActiveUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },

      include: {
        user_roles: {
          include: {
            role: true,
          },
        },

        owned_businesses: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Usuario no válido');
    }

    return user;
  }

  private buildMeResponse(user: any) {
    return {
      user: mapUser(user),

      authorization: mapAuthorization(user),

      meta: mapMeta(),
    };
  }
}
