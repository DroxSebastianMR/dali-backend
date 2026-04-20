import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "@/common/prisma/prisma.service";

@Injectable()
export class MaintenanceGuard implements CanActivate {
  private cachedMaintenance: boolean | null = null;
  private lastCheck = 0;
  private readonly CACHE_TTL = 5000;

  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (this.isStatusRoute(request)) return true;

    const isMaintenance = await this.isMaintenanceEnabled();

    if (!isMaintenance) return true;

    throw new ServiceUnavailableException({
      message: "Sistema en mantenimiento",
      maintenance: true,
    });
  }
  private isStatusRoute(request: any): boolean {
    return (
      request.method === "GET" &&
      request.url === "/system/status"
    );
  }
  private async isMaintenanceEnabled(): Promise<boolean> {
    const now = Date.now();

    if (this.cachedMaintenance !== null && now - this.lastCheck < this.CACHE_TTL) {
      return this.cachedMaintenance;
    }

    const environment = process.env.NODE_ENV ?? "development";

    const config = await this.prisma.systemConfig.findUnique({
      where: { environment },
      select: {
        maintenance_enabled: true,
        maintenance_message: true,
      },
    });

    this.cachedMaintenance = config?.maintenance_enabled ?? false;
    this.lastCheck = now;

    return this.cachedMaintenance;
  }
}