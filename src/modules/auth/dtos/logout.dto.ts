import { ApiProperty } from '@nestjs/swagger';

export class LogoutDTO {
  @ApiProperty()
  refresh_token!: string;
}
