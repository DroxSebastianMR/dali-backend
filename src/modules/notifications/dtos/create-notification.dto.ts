import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { NotificationType } from "@/modules/notifications/enums/notification-type.enum";

export class CreateNotificationDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    userId!: number;

    @ApiPropertyOptional({ example: 10 })
    @IsOptional()
    @IsNumber()
    businessId?: number;

    @ApiProperty({ example: '¡Bajó de precio!' })
    @IsString()
    title!: string;

    @ApiProperty({ example: 'El cemento Sol que buscas está un 10% más barato en Ferretería "El Paisa"' })
    @IsString()
    body!: string;

    @ApiProperty({
        enum: NotificationType,
        example: NotificationType.PRICE_ALERT
    })
    @IsEnum(NotificationType)
    type!: NotificationType;
}