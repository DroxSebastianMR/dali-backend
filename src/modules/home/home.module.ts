import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { HomeController } from '@/modules/home/controllers/home.controller';
import { HomeService } from '@/modules/home/services/home.service';

@Module({
  controllers: [HomeController],

  providers: [
    PrismaService,
    HomeService,
  ],
})
export class HomeModule {}