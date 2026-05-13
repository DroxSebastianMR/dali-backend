import {
  InternalServerErrorException,
} from "@nestjs/common";

export class AIResponseUtil {
  static extractContent(
    response: any,
  ) {
    const content =
      response?.choices?.[0]
        ?.message?.content;

    if (!content) {
      throw new InternalServerErrorException(
        "Respuesta vacía de la IA",
      );
    }

    return this.parseJSON(content);
  }

  private static parseJSON(
    content: string,
  ) {
    try {
      const cleanContent = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanContent);
    } catch {
      throw new InternalServerErrorException(
        "La IA retornó un JSON inválido",
      );
    }
  }
}