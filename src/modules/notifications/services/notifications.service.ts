import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PushStrategy } from '../strategies/push.strategy';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { RegisterDeviceDto } from '../dtos/register-device.dto';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly pushStrategy: PushStrategy,
    ) { }


    async registerDevice(userId: number, dto: RegisterDeviceDto) {
        return await this.prisma.userDevice.upsert({
            where: { device_token: dto.deviceToken },
            update: {
                last_used_at: new Date(),
                platform: dto.platform,
                device_id: dto.deviceId
            },
            create: {
                user_id: userId,
                device_token: dto.deviceToken,
                device_id: dto.deviceId,
                platform: dto.platform,
                model: dto.model,
            },
        });
    }

    async sendNotification(data: CreateNotificationDto) {
        const pref = await this.prisma.notificationPreference.findFirst({
            where: { user_id: data.userId, channel: 'PUSH', notification_type: data.type }
        });

        if (pref && !pref.enabled) return;

        const devices = await this.prisma.userDevice.findMany({
            where: { user_id: data.userId }
        });

        for (const device of devices) {
            await this.pushStrategy.send(device.device_token, data.title, data.body);
        }

        return await this.prisma.notification.create({
            data: {
                user_id: data.userId,
                business_id: data.businessId,
                title: data.title,
                body: data.body,
                type: data.type,
            }
        });
    }

    async findByUser(userId: number) {
        return await this.prisma.notification.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });
    }

    async markAsRead(id: number) {
        return await this.prisma.notification.update({
            where: { id },
            data: { is_read: true }
        });
    }
}