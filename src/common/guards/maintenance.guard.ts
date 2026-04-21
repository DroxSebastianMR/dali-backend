import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "@/common/prisma/prisma.service";
import { ErrorFactory } from "@/common/errors/error.factory";
import { ErrorCode } from "@/common/errors/error-codes";

type MaintenanceState = {
  enabled: boolean;
  message: string | null;
  estimatedEnd: string | null;
};

@Injectable()
export class MaintenanceGuard implements CanActivate {
  private cache: MaintenanceState | null = null;
  private lastCheck = 0;

  private readonly CACHE_TTL = 5000;

  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (this.isStatusRoute(request)) return true;

    const maintenance = await this.getMaintenanceState();

    if (!maintenance.enabled) return true;

    throw new ServiceUnavailableException(
      ErrorFactory.create({
        statusCode: 503,
        error: "SERVICE_UNAVAILABLE",
        code: ErrorCode.SYSTEM_MAINTENANCE,
        message: maintenance.message ?? "Sistema en mantenimiento",
        path: request.url,
        meta: {
          maintenance: true,
          estimatedEnd: maintenance.estimatedEnd,
        },
      }),
    );
  }

  private isStatusRoute(request: any): boolean {
    return request.method === "GET" && request.url === "/system/status";
  }

  private async getMaintenanceState(): Promise<MaintenanceState> {
    const now = Date.now();

    if (this.cache && now - this.lastCheck < this.CACHE_TTL) {
      return this.cache;
    }

    const environment = process.env.NODE_ENV ?? "development";

    const config = await this.prisma.systemConfig.findUnique({
      where: { environment },
      select: {
        maintenance_enabled: true,
        maintenance_message: true,
        maintenance_end: true,
      },
    });

    this.cache = {
      enabled: config?.maintenance_enabled ?? false,
      message: config?.maintenance_message ?? null,
      estimatedEnd: config?.maintenance_end?.toISOString() ?? null,
    };

    this.lastCheck = now;

    return this.cache;
  }
}