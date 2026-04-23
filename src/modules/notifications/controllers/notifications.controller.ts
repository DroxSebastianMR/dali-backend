import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Req,
    Patch,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from '../services/notifications.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@/common/validation/validation.pipe';
import { CreateNotificationSchema } from '../schema/create-notification.schema';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { RegisterDeviceSchema } from '../schema/register-device.schema';
import { RegisterDeviceDto } from '../dtos/register-device.dto';



@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post('register-token')
    @ApiOperation({ summary: 'Registrar token de dispositivo (FCM)' })
    async registerToken(
        @Req() req,
        @Body(new ValidationPipe(RegisterDeviceSchema)) body: RegisterDeviceDto
    ) {
        return this.notificationsService.registerDevice(req.user.id, body);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener mis notificaciones' })
    async getMyNotifications(@Req() req) {
        return this.notificationsService.findByUser(req.user.id);
    }

    @Patch(':id/read')
    @ApiOperation({ summary: 'Marcar notificación como leída' })
    async markAsRead(@Param('id', ParseIntPipe) id: number) {
        return this.notificationsService.markAsRead(id);
    }

    @Post('send')
    @ApiOperation({ summary: 'Enviar una notificación manual' })
    async sendNotification(
        @Body(new ValidationPipe(CreateNotificationSchema)) body: CreateNotificationDto
    ) {
        return this.notificationsService.sendNotification(body);
    }




}