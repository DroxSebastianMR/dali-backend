import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { HomeController } from '@/modules/home/controllers/home.controller';
import { HomeService } from '@/modules/home/services/home.service';

import { BannerService } from '@/modules/home/domain/banner/banner.service';
import { BannerRepository } from '@/modules/home/infrastructure/home.repository';
import { BannerScorer } from '@/modules/home/domain/banner/banner.scorer';
import { BannerMapper } from '@/modules/home/domain/banner/banner.mapper';

@Module({
  controllers: [HomeController],

  providers: [
    PrismaService,
    HomeService,
    BannerService,
    BannerRepository,
    BannerScorer,
    BannerMapper,
  ],
})
export class HomeModule {}