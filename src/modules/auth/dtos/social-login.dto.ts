import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SocialProvider } from '../enums/social-provider.enum';

export class SocialLoginDTO {
  @ApiProperty({
    enum: SocialProvider,
  })
  @IsEnum(SocialProvider)
  provider!: SocialProvider;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token!: string;
}
