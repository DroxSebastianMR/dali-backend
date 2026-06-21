import { Injectable } from '@nestjs/common';
import { BannerService } from '@/modules/home/domain/banner/banner.service';
import { HomeBannersInput } from '@/modules/home/schema/home-banners.schema';
import { HomeBannersResponseDTO } from '@/modules/home/dtos/home-banners.dto';
import { HomeCarouselsInput } from '../schema/home-carousels.schema';
import { HomeCarouselsResponseDTO } from '../dtos/home-carousels.dto';
import { CarouselService } from '../domain/banner/carousel/carousel.service';

@Injectable()
export class HomeService {
  constructor(
    private readonly bannerService: BannerService,
    private readonly carouselService: CarouselService,
  ) {}

  async getHomeBanners(
    input: HomeBannersInput,
  ): Promise<HomeBannersResponseDTO> {
    return this.bannerService.getSmartBanners(input);
  }
  async getHomeCarousels(
    input: HomeCarouselsInput,
  ): Promise<HomeCarouselsResponseDTO> {
    return this.carouselService.getHomeCarousels(input);
  }
}
