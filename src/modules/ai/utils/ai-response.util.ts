import { InternalServerErrorException } from '@nestjs/common';
import type { ChatCompletion } from 'openai/resources/chat/completions';

export class AIResponseUtil {
  static extractContent(response: ChatCompletion): unknown {
    const content = response.choices[0]?.message?.content;

    if (!content || typeof content !== 'string') {
      throw new InternalServerErrorException('Respuesta vacía de la IA');
    }

    return this.parseJSON(content);
  }

  private static parseJSON(content: string): unknown {
    try {
      const cleanContent = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      return JSON.parse(cleanContent) as unknown;
    } catch {
      throw new InternalServerErrorException('La IA retornó un JSON inválido');
    }
  }
}
