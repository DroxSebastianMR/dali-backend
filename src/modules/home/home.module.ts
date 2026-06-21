import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { HomeController } from '@/modules/home/controllers/home.controller';
import { HomeService } from '@/modules/home/services/home.service';

import { BannerService } from '@/modules/home/domain/banner/banner.service';
import { BannerRepository } from '@/modules/home/infrastructure/home.repository';
import { BannerScorer } from '@/modules/home/domain/banner/banner.scorer';
import { BannerMapper } from '@/modules/home/domain/banner/banner.mapper';
import { CarouselService } from './domain/banner/carousel/carousel.service';
import { CarouselMapper } from './domain/banner/carousel/carousel.mapper';

@Module({
  controllers: [HomeController],

  providers: [
    PrismaService,
    HomeService,
    BannerService,
    BannerRepository,
    BannerScorer,
    BannerMapper,
    CarouselService,
    CarouselMapper,
  ],
})
export class HomeModule {}
