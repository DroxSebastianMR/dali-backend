import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { HomeBannersInput } from '@/modules/home/schema/home-banners.schema';
import { HomeBannersResponseDTO } from '@/modules/home/dtos/home-banners.dto';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  private getDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  async getHomeBanners(
    input: HomeBannersInput,
  ): Promise<HomeBannersResponseDTO> {
    const now = new Date();

    const lat1 = Number(input.latitude);
    const lng1 = Number(input.longitude);

    const banners = await this.prisma.homeBanner.findMany({
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

    const scored = banners.map((banner) => {
      let minDistance = Infinity;

      for (const location of banner.locations) {
        const lat2 = Number(location.latitude);
        const lng2 = Number(location.longitude);

        if (!isNaN(lat2) && !isNaN(lng2)) {
          const d = this.getDistanceKm(lat1, lng1, lat2, lng2);
          if (d < minDistance) minDistance = d;
        }
      }

      if (minDistance === Infinity) minDistance = 9999;

      return {
        banner,
        distance: minDistance,
      };
    });

    scored.sort((a, b) => a.distance - b.distance);

    let result = scored.slice(0, 5).map((item) => item.banner);

    if (result.length === 0) {
      result = banners.slice(0, 1);
    }

    return {
      success: true,
      total: result.length,
      banners: result.map((banner) => {
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
                  nombre: target.business.nombre_comercial,
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