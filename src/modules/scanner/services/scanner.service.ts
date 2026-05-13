import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";

import { AIService } from "@/modules/ai/services/ai.service";

import { SCANNER_ANALYSIS_PROMPT } from "@/modules/ai/prompts/scanner-analysis.prompt";

import { SCANNER_CONSTANTS } from "@/modules/scanner/constants/scanner.constants";

import type { UploadedFileType } from "@/modules/scanner/types/uploaded-file.type";

@Injectable()
export class ScannerService {
  constructor(
    private readonly aiService: AIService,
  ) {}

  async analyze(
    file: UploadedFileType,
  ) {
    this.validateImage(file);

    return {
      success: true,

      data:
        await this.aiService.analyzeImage(
          SCANNER_ANALYSIS_PROMPT,
          {
            base64Image:
              file.buffer.toString(
                "base64",
              ),

            mimeType:
              file.mimetype,
          },
        ),
    };
  }

  private validateImage(
    file?: UploadedFileType,
  ) {
    if (!file) {
      throw new BadRequestException(
        "La imagen es requerida",
      );
    }

    if (
      !SCANNER_CONSTANTS.ALLOWED_MIME_TYPES.includes(
        file.mimetype as any,
      )
    ) {
      throw new BadRequestException(
        "Formato inválido",
      );
    }

    if (
      file.size >
      SCANNER_CONSTANTS.MAX_IMAGE_SIZE
    ) {
      throw new BadRequestException(
        "Imagen demasiado pesada",
      );
    }
  }
}