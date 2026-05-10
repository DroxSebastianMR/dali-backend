// src/modules/home/controllers/home.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@/common/validation/validation.pipe';
import { HomeService } from '@/modules/home/services/home.service';
import {
  HomeBannersDTO,
  HomeBannersResponseDTO,
} from '@/modules/home/dtos/home-banners.dto';
import { HomeBannersSchema } from '@/modules/home/schema/home-banners.schema';

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {}

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
}