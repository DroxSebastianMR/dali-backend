import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PushStrategy } from './strategies/push.strategy';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, PushStrategy],
  exports: [NotificationsService],
})
export class NotificationsModule {}
