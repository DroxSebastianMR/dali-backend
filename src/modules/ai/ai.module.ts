import { Module } from '@nestjs/common';

import { AIService } from '@/modules/ai/services/ai.service';

import { OpenRouterProvider } from '@/modules/ai/providers/openrouter.provider';

@Module({
  providers: [AIService, OpenRouterProvider],

  exports: [AIService],
})
export class AIModule {}
