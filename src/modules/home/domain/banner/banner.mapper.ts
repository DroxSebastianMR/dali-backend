import { Injectable } from '@nestjs/common';
import { HomeBannersResponseDTO } from '@/modules/home/dtos/home-banners.dto';

@Injectable()
export class BannerMapper {
  toResponse(banners: any[]): HomeBannersResponseDTO {
    return {
      success: true,
      total: banners.length,
      banners: banners.map((banner) => {
        const target = banner.targets?.[0];

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
            type: target?.target_type,
            business: target?.business
              ? {
                  id: target.business.id,
                  nombre: target.business.nombre_comercial,
                  logo: target.business.logo_url,
                }
              : null,
            categoryId: target?.category_id,
            productId: target?.product_id,
            searchQuery: target?.search_query,
            externalUrl: target?.external_url,
          },
        };
      }),
    };
  }
}