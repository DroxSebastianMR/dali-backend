import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@/common/validation/validation.pipe';
import { HomeService } from '@/modules/home/services/home.service';
import {
  HomeBannersDTO,
  HomeBannersResponseDTO,
} from '@/modules/home/dtos/home-banners.dto';
import { HomeBannersSchema } from '@/modules/home/schema/home-banners.schema';
import {
  HomeCarouselsDTO,
  HomeCarouselsResponseDTO,
} from '../dtos/home-carousels.dto';
import { HomeCarouselsSchema } from '../schema/home-carousels.schema';

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post('banners')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener banners del home',
  })
  @ApiResponse({
    status: 200,
    description: 'Banners obtenidos correctamente',
  })
  async getHomeBanners(
    @Body(new ValidationPipe(HomeBannersSchema))
    body: HomeBannersDTO,
  ): Promise<HomeBannersResponseDTO> {
    return this.homeService.getHomeBanners(body);
  }

  @Post('carousels')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener carruseles del home',
  })
  @ApiResponse({
    status: 200,
    description: 'Carruseles obtenidos correctamente',
  })
  async getHomeCarousels(
    @Body(new ValidationPipe(HomeCarouselsSchema))
    body: HomeCarouselsDTO,
  ): Promise<HomeCarouselsResponseDTO> {
    return this.homeService.getHomeCarousels(body);
  }
}
