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
  async getTopBusinesses() {
    return this.prisma.business.findMany({
      where: {
        status: 'ACTIVE',
      },

      take: 10,

      orderBy: [
        {
          is_verified: 'desc',
        },
        {
          average_rating: 'desc',
        },
        {
          total_reviews: 'desc',
        },
      ],
    });
  }
  async getPharmaciesNearby(latitude: number, longitude: number) {
    void latitude;
    void longitude;

    return this.prisma.business.findMany({
      where: {
        status: 'ACTIVE',

        OR: [
          {
            trade_name: {
              contains: 'farmacia',
              mode: 'insensitive',
            },
          },
          {
            trade_name: {
              contains: 'botica',
              mode: 'insensitive',
            },
          },
        ],
      },

      include: {
        locations: {
          where: {
            is_active: true,
          },
          take: 1,
        },
      },

      take: 10,

      orderBy: [
        {
          is_verified: 'desc',
        },
        {
          average_rating: 'desc',
        },
        {
          total_reviews: 'desc',
        },
      ],
    });
  }

  async getRecentBusinesses() {
    return this.prisma.business.findMany({
      where: {
        status: 'ACTIVE',
      },

      include: {
        locations: {
          where: {
            is_active: true,
          },
          take: 1,
        },
      },

      take: 10,

      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
