import { Injectable } from '@nestjs/common';
import { BannerService } from '@/modules/home/controllers/domain/banner/banner.service';
import { HomeBannersInput } from '@/modules/home/schema/home-banners.schema';
import { HomeBannersResponseDTO } from '@/modules/home/dtos/home-banners.dto';

@Injectable()
export class HomeService {
  constructor(private readonly bannerService: BannerService) {}

  async getHomeBanners(
    input: HomeBannersInput,
  ): Promise<HomeBannersResponseDTO> {
    return this.bannerService.getSmartBanners(input);
  }
}