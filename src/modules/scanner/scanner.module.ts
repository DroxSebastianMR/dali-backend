import { Module } from '@nestjs/common';

import { AIModule } from '@/modules/ai/ai.module';

import { ScannerController } from '@/modules/scanner/controllers/scanner.controller';

import { ScannerService } from '@/modules/scanner/services/scanner.service';

@Module({
  imports: [AIModule],

  controllers: [ScannerController],

  providers: [ScannerService],
})
export class ScannerModule {}
