import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import OpenAI from 'openai';
import type { ChatCompletion } from 'openai/resources/chat/completions';

import { AI_CONSTANTS } from '@/modules/ai/constants/ai.constants';
import { AnalyzeImageInput } from '@/modules/ai/types/ai-provider.type';
import { AITextResponse } from '@/modules/ai/types/ai-response.type';
import { AIResponseUtil } from '@/modules/ai/utils/ai-response.util';

@Injectable()
export class OpenRouterProvider {
  private readonly logger = new Logger(OpenRouterProvider.name);

  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY no configurado');
    }

    this.client = new OpenAI({
      apiKey,
      baseURL: AI_CONSTANTS.OPENROUTER_BASE_URL,
    });
  }

  async analyzeImage(
    prompt: string,
    input: AnalyzeImageInput,
  ): Promise<AITextResponse> {
    try {
      const completion: ChatCompletion =
        await this.client.chat.completions.create({
          model: AI_CONSTANTS.DEFAULT_MODEL,
          max_tokens: AI_CONSTANTS.MAX_TOKENS,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: this.buildImageUrl(input),
                  },
                },
              ],
            },
          ],
        });

      return {
        data: AIResponseUtil.extractContent(completion),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('OPENROUTER_PROVIDER_ERROR', error.stack);
      } else {
        this.logger.error('OPENROUTER_PROVIDER_ERROR', String(error));
      }

      throw new InternalServerErrorException('Error conectando con OpenRouter');
    }
  }

  private buildImageUrl(input: AnalyzeImageInput): string {
    return `data:${input.mimeType};base64,${input.base64Image}`;
  }
}
