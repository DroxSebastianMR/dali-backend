  import { Injectable, NotFoundException } from "@nestjs/common";
  import { PrismaService } from "@/common/prisma/prisma.service";
  import { SystemStatusInput } from "@/modules/system/schema/system-status.schema";
  import { SystemStatusResponseDTO } from "@/modules/system/dtos/system-status.dto";
  import { VersionUtil } from "@/modules/system/utils/versions/version.util";
  import { SystemStatusFactory } from "@/modules/system/factories/system-status.factory";
  import { UPDATE_MESSAGES } from "@/modules/system/constants/update-messages";

  @Injectable()
export class SystemStatusService {
  constructor(private prisma: PrismaService) {}

  async getStatus(input: SystemStatusInput): Promise<SystemStatusResponseDTO> {
    const environment = process.env.NODE_ENV ?? "development";
    const systemConfig = await this.getSystemConfig(environment, input.platform);
    const appConfig = this.getAppConfig(systemConfig);

    if (this.isMaintenance(systemConfig)) {
      return this.buildMaintenanceResponse(systemConfig, appConfig, input, environment);
    }

    if (this.isUpdateRequired(input.appVersion, appConfig.min_supported_version)) {
      return this.buildUpdateRequiredResponse(systemConfig, appConfig, input, environment);
    }

    return this.buildOkResponse(systemConfig, appConfig, input, environment);
  }

  private async getSystemConfig(environment: string, platform: string) {
    const config = await this.prisma.systemConfig.findUnique({
      where: { environment },
      include: {
        appConfigs: {
          where: {
            platform,
            active: true,
          },
        },
      },
    });

    if (!config) {
      throw new NotFoundException("System offline");
    }

    return config;
  }

  private getAppConfig(systemConfig: any) {
    const appConfig = systemConfig.appConfigs?.[0];

    if (!appConfig) {
      throw new NotFoundException("App configuration not found");
    }

    return appConfig;
  }

  private isMaintenance(systemConfig: any): boolean {
    return systemConfig.maintenance_enabled;
  }

  private isUpdateRequired(client?: string, min?: string): boolean {
    return VersionUtil.isLower(client, min);
  }

  private buildMaintenanceResponse(
    systemConfig: any,
    appConfig: any,
    input: SystemStatusInput,
    environment: string
  ): SystemStatusResponseDTO {
    return SystemStatusFactory.base({
      mode: "MAINTENANCE",
      environment,
      backend: this.buildBackend(systemConfig, "MAINTENANCE"),
      app: this.buildApp(appConfig, input),
      maintenance: {
        enabled: true,
        message: systemConfig.maintenance_message,
        estimatedEnd: systemConfig.maintenance_end?.toISOString() ?? null,
      },
    });
  }

  private buildUpdateRequiredResponse(
    systemConfig: any,
    appConfig: any,
    input: SystemStatusInput,
    environment: string
  ): SystemStatusResponseDTO {
    const messages = UPDATE_MESSAGES[appConfig.update_type];

    return SystemStatusFactory.base({
      mode: "UPDATE_REQUIRED",
      environment,
      backend: this.buildBackend(systemConfig, "OK"),
      app: {
        ...this.buildApp(appConfig, input),
        update: {
          required: true,
          type: appConfig.update_type,
          message: appConfig.update_message ?? messages.required,
          storeUrl: appConfig.store_url,
        },
      },
      maintenance: this.buildNoMaintenance(),
    });
  }

  private buildOkResponse(
    systemConfig: any,
    appConfig: any,
    input: SystemStatusInput,
    environment: string
  ): SystemStatusResponseDTO {
    return SystemStatusFactory.base({
      mode: "OK",
      environment,
      backend: this.buildBackend(systemConfig, "OK"),
      app: this.buildApp(appConfig, input),
      maintenance: this.buildNoMaintenance(),
    });
  }

  private buildBackend(systemConfig: any, status: "OK" | "MAINTENANCE") {
    return {
      name: systemConfig.backend_name,
      version: systemConfig.backend_version,
      status,
    };
  }

  private buildApp(appConfig: any, input: SystemStatusInput) {
    return {
      currentVersion: appConfig.current_version,
      minSupportedVersion: appConfig.min_supported_version,
      clientVersion: input.appVersion ?? null,
      update: null,
    };
  }

  private buildNoMaintenance() {
    return {
      enabled: false,
      message: null,
      estimatedEnd: null,
    };
  }
}