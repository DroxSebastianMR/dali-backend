import { ApiProperty } from '@nestjs/swagger';

export class VerifyResetTokenDTO {
  @ApiProperty({ example: 'token-recibido-por-email' })
  token!: string;
}
