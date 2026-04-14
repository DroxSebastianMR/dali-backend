import {
  Controller,
  Get,
  Headers,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
} from "@nestjs/swagger";

import { SystemStatusService } from "@/modules/system/services/system-status.service";
import { SystemStatusResponseDTO } from "../dtos/system-status.dto";
import { SystemStatusSchema } from "@/modules/system/schema/system-status.schema";

@ApiTags("System")
@Controller("system")
export class SystemStatusController {
  constructor(
    private readonly systemStatusService: SystemStatusService,
  ) {}

  @Get("status")
  @ApiOperation({
    summary: "Estado del sistema y configuración de la app",
  })
  @ApiHeader({
    name: "x-platform",
    description: "Plataforma cliente (ANDROID | IOS)",
    required: true,
  })
  @ApiHeader({
    name: "x-app-version",
    description: "Versión de la app",
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Estado actual del sistema",
    type: SystemStatusResponseDTO,
  })
  async getSystemStatus(
    @Headers("x-platform") platform: string,
    @Headers("x-app-version") appVersion?: string,
  ): Promise<SystemStatusResponseDTO> {

    const parsedInput = SystemStatusSchema.parse({
      platform,
      appVersion,
    });

    return this.systemStatusService.getStatus(parsedInput);
  }
}