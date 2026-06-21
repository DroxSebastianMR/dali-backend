import { Injectable } from '@nestjs/common';
import {
  HomeCarouselType,
  HomeCarouselsResponseDTO,
} from '@/modules/home/dtos/home-carousels.dto';

@Injectable()
export class CarouselMapper {
  private mapBusinesses(businesses: any[]) {
    return businesses.map((business) => ({
      id: business.id,
      nombre: business.trade_name,
      descripcion: business.description,
      logo: business.logo_url,
      portada: business.cover_image_url,
      verified: business.is_verified,
      rating: Number(business.average_rating ?? 0),
      reviews: business.total_reviews,
    }));
  }

  toResponse(data: {
    topBusinesses: any[];
    pharmaciesNearby: any[];
    recentBusinesses: any[];
  }): HomeCarouselsResponseDTO {
    return {
      success: true,

      carousels: [
        {
          type: HomeCarouselType.TOP_BUSINESSES,

          title: 'Negocios Destacados',

          total: data.topBusinesses.length,

          items: this.mapBusinesses(data.topBusinesses),
        },

        {
          type: HomeCarouselType.PHARMACIES_NEARBY,

          title: 'Farmacias Cerca de Ti',

          total: data.pharmaciesNearby.length,

          items: this.mapBusinesses(data.pharmaciesNearby),
        },

        {
          type: HomeCarouselType.RECENT_BUSINESSES,

          title: 'Nuevos Negocios',

          total: data.recentBusinesses.length,

          items: this.mapBusinesses(data.recentBusinesses),
        },
      ],
    };
  }
}
