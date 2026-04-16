import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDTO {
  @ApiProperty({ example: 'refresh_token_example' })
  @IsString()
  refresh_token: string;
}