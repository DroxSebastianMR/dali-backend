import { ApiProperty } from '@nestjs/swagger';
import { BannerType, BannerTargetType } from '@prisma/client';

export class HomeBannersDTO {
  @ApiProperty()
  latitude!: number;

  @ApiProperty()
  longitude!: number;

  @ApiProperty({ nullable: true })
  city?: string;

  @ApiProperty({ nullable: true })
  district?: string;
}

class BannerBusinessDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: string;

  @ApiProperty({ nullable: true })
  logo!: string | null;
}

class BannerTargetDTO {
  @ApiProperty({ enum: BannerTargetType })
  type!: BannerTargetType;

  @ApiProperty({ nullable: true })
  business!: BannerBusinessDTO | null;

  @ApiProperty({ nullable: true })
  categoryId!: number | null;

  @ApiProperty({ nullable: true })
  productId!: number | null;

  @ApiProperty({ nullable: true })
  searchQuery!: string | null;

  @ApiProperty({ nullable: true })
  externalUrl!: string | null;
}

class BannerDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty({ nullable: true })
  subtitle!: string | null;

  @ApiProperty()
  imageUrl!: string;

  @ApiProperty({ nullable: true })
  backgroundColor!: string | null;

  @ApiProperty({ nullable: true })
  badgeText!: string | null;

  @ApiProperty({ nullable: true })
  badgeColor!: string | null;

  @ApiProperty({ nullable: true })
  ctaText!: string | null;

  @ApiProperty({ enum: BannerType })
  type!: BannerType;

  @ApiProperty()
  priority!: number;

  @ApiProperty({ type: BannerTargetDTO })
  target!: BannerTargetDTO;
}

export class HomeBannersResponseDTO {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  total!: number;

  @ApiProperty({ type: [BannerDTO] })
  banners!: BannerDTO[];
}
