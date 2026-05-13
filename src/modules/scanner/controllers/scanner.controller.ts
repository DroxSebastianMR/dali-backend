import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { FileInterceptor } from "@nestjs/platform-express";
import { ScannerService } from "@/modules/scanner/services/scanner.service";
import type { UploadedFileType } from "@/modules/scanner/types/uploaded-file.type";

@ApiTags("Scanner")
@Controller("scanner")
export class ScannerController {
  constructor(
    private readonly scannerService: ScannerService,
  ) {}

  @Post("analyze")
  @HttpCode(HttpStatus.OK)

  @UseInterceptors(
    FileInterceptor("image"),
  )

  @ApiConsumes("multipart/form-data")

  @ApiOperation({
    summary:
      "Analizar imagen usando inteligencia artificial",
  })

  @ApiResponse({
    status: 200,
    description:
      "Imagen analizada correctamente",
  })

  @ApiResponse({
    status: 400,
    description:
      "La imagen enviada es inválida",
  })

  @ApiResponse({
    status: 500,
    description:
      "Error interno procesando imagen",
  })

  @ApiBody({
    schema: {
      type: "object",

      properties: {
        image: {
          type: "string",
          format: "binary",
        },
      },

      required: ["image"],
    },
  })

  async analyze(
    @UploadedFile()
    file: UploadedFileType,
  ) {
    return this.scannerService.analyze(
      file,
    );
  }
}