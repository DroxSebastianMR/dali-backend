import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ example: 'token-recibido-por-email' })
  @IsString()
  token!: string;

  @ApiProperty({ example: 'NewPassword123' })
  @IsString()
  @MinLength(8)
  new_password!: string;
}
