import { Injectable } from '@nestjs/common';
import { BannerRepository } from '@/modules/home/infrastructure/home.repository';
import { CarouselMapper } from './carousel.mapper';
import { HomeCarouselsInput } from '@/modules/home/schema/home-carousels.schema';
import { HomeCarouselsResponseDTO } from '@/modules/home/dtos/home-carousels.dto';

@Injectable()
export class CarouselService {
  constructor(
    private readonly repository: BannerRepository,
    private readonly mapper: CarouselMapper,
  ) {}

  async getHomeCarousels(
    input: HomeCarouselsInput,
  ): Promise<HomeCarouselsResponseDTO> {
    const [topBusinesses, pharmaciesNearby, recentBusinesses] =
      await Promise.all([
        this.repository.getTopBusinesses(),

        this.repository.getPharmaciesNearby(input.latitude, input.longitude),

        this.repository.getRecentBusinesses(),
      ]);

    return this.mapper.toResponse({
      topBusinesses,
      pharmaciesNearby,
      recentBusinesses,
    });
  }
}
