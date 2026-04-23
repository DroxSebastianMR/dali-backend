import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RecoverPasswordDTO {
    @ApiProperty({  example: 'usuario@gmail.com'})
    @IsEmail()
    email: string;
}