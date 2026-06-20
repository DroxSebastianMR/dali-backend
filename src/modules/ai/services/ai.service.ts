import { Injectable } from '@nestjs/common';

import { OpenRouterProvider } from '@/modules/ai/providers/openrouter.provider';

import { AnalyzeImageInput } from '@/modules/ai/types/ai-provider.type';

@Injectable()
export class AIService {
  constructor(private readonly openRouterProvider: OpenRouterProvider) {}

  async analyzeImage(prompt: string, input: AnalyzeImageInput) {
    return this.openRouterProvider.analyzeImage(prompt, input);
  }
}
