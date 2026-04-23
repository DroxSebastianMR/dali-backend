import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDeviceDto {
    @ApiProperty({
        description: 'Token único generado por Firebase (FCM)',
        example: 'fcm_token_1234567890_abcdefg'
    })
    @IsString()
    @IsNotEmpty()
    deviceToken!: string;

    @ApiProperty({
        description: 'ID único del hardware del dispositivo',
        example: 'uuid-device-09876'
    })
    @IsString()
    @IsNotEmpty()
    deviceId!: string;

    @ApiProperty({
        enum: ['ANDROID', 'IOS', 'WEB'],
        example: 'ANDROID',
        description: 'Plataforma del dispositivo'
    })
    @IsEnum(['ANDROID', 'IOS', 'WEB'])
    platform!: 'ANDROID' | 'IOS' | 'WEB';

    @ApiPropertyOptional({
        example: 'Samsung Galaxy S21',
        description: 'Modelo físico del equipo'
    })
    @IsOptional()
    @IsString()
    model?: string;
}