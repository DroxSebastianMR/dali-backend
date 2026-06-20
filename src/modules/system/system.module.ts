import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { SystemStatusService } from '@/modules/system/services/system-status.service';
import { SystemStatusController } from '@/modules/system/controllers/system-status.controller';

@Module({
  controllers: [SystemStatusController],
  providers: [PrismaService, SystemStatusService],
})
export class SystemModule {}
