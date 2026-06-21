import { ApiProperty } from '@nestjs/swagger';

export enum HomeCarouselType {
  TOP_BUSINESSES = 'TOP_BUSINESSES',
  PHARMACIES_NEARBY = 'PHARMACIES_NEARBY',
  RECENT_BUSINESSES = 'RECENT_BUSINESSES',
}

class BusinessCarouselItemDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ nullable: true })
  descripcion!: string | null;

  @ApiProperty({ nullable: true })
  logo!: string | null;

  @ApiProperty({ nullable: true })
  portada!: string | null;

  @ApiProperty()
  verified!: boolean;

  @ApiProperty()
  rating!: number;

  @ApiProperty()
  reviews!: number;
}

class CarouselDTO {
  @ApiProperty({
    enum: HomeCarouselType,
  })
  type!: HomeCarouselType;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  total!: number;

  @ApiProperty({
    type: [BusinessCarouselItemDTO],
  })
  items!: BusinessCarouselItemDTO[];
}

export class HomeCarouselsDTO {
  @ApiProperty()
  latitude!: number;

  @ApiProperty()
  longitude!: number;
}

export class HomeCarouselsResponseDTO {
  @ApiProperty()
  success!: boolean;

  @ApiProperty({
    type: [CarouselDTO],
  })
  carousels!: CarouselDTO[];
}
