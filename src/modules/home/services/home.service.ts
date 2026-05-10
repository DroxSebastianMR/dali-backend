import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import {
  HomeBannersInput,
} from '@/modules/home/schema/home-banners.schema';
import { HomeBannersResponseDTO } from '@/modules/home/dtos/home-banners.dto';

@Injectable()
export class HomeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getHomeBanners(
    input: HomeBannersInput,
  ): Promise<HomeBannersResponseDTO> {
    const now = new Date();

    const banners = await this.prisma.homeBanner.findMany({
      where: {
        is_active: true,

        OR: [
          {
            starts_at: null,
          },
          {
            starts_at: {
              lte: now,
            },
          },
        ],

        AND: [
          {
            OR: [
              {
                expires_at: null,
              },
              {
                expires_at: {
                  gte: now,
                },
              },
            ],
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

    const filtered = banners.filter((banner) => {
      if (banner.locations.length === 0) {
        return true;
      }

      return banner.locations.some((location) => {
        if (
          location.city &&
          input.city &&
          location.city.toLowerCase() !==
            input.city.toLowerCase()
        ) {
          return false;
        }

        if (
          location.district &&
          input.district &&
          location.district.toLowerCase() !==
            input.district.toLowerCase()
        ) {
          return false;
        }

        return true;
      });
    });

    return {
      success: true,
      total: filtered.length,

      banners: filtered.map((banner) => {
        const target = banner.targets[0];

        return {
          id: banner.id,
          title: banner.title,
          subtitle: banner.subtitle,
          imageUrl: banner.image_url,
          backgroundColor: banner.background_color,
          badgeText: banner.badge_text,
          badgeColor: banner.badge_color,
          ctaText: banner.cta_text,
          type: banner.type,
          priority: banner.priority,

          target: {
            type: target.target_type,

            business: target.business
              ? {
                  id: target.business.id,
                  nombre:
                    target.business.nombre_comercial,
                  logo: target.business.logo_url,
                }
              : null,

            categoryId: target.category_id,
            productId: target.product_id,

            searchQuery: target.search_query,

            externalUrl: target.external_url,
          },
        };
      }),
    };
  }
}