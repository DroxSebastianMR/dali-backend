import { Injectable } from '@nestjs/common';
import { BannerRepository } from '@/modules/home/infrastructure/home.repository';
import { BannerScorer } from '@/modules/home/domain/banner/banner.scorer';
import { BannerMapper } from '@/modules/home/domain/banner/banner.mapper';
import { HomeBannersInput } from '@/modules/home/schema/home-banners.schema';
import { HomeBannersResponseDTO } from '@/modules/home/dtos/home-banners.dto';

@Injectable()
export class BannerService {
  constructor(
    private readonly bannerRepository: BannerRepository,
    private readonly bannerScorer: BannerScorer,
    private readonly bannerMapper: BannerMapper,
  ) {}

  async getSmartBanners(
    input: HomeBannersInput,
  ): Promise<HomeBannersResponseDTO> {
    const now = new Date();

    const banners = await this.bannerRepository.findActiveBanners(now);

    const scored = this.bannerScorer.scoreByLocation(
      banners,
      Number(input.latitude),
      Number(input.longitude),
    );

    const selected = this.selectTop(scored, 5);

    return this.bannerMapper.toResponse(selected);
  }

  private selectTop(scored: any[], limit: number) {
    const result = scored.slice(0, limit).map((x) => x.banner);
    return result.length ? result : scored.slice(0, 1).map((x) => x.banner);
  }
}
