import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveBanners(now: Date) {
    return this.prisma.homeBanner.findMany({
      where: {
        is_active: true,
        OR: [{ starts_at: null }, { starts_at: { lte: now } }],
        AND: [
          {
            OR: [{ expires_at: null }, { expires_at: { gte: now } }],
          },
        ],
      },
      include: {
        targets: {
          include: {
            business: true,
            category: true,
            product: true,
          },
        },
        locations: true,
      },
      orderBy: {
        priority: 'desc',
      },
    });
  }
}
