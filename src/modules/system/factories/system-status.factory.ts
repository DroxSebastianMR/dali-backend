import { SystemStatusResponseDTO } from '@/modules/system/dtos/system-status.dto';

export class SystemStatusFactory {
  static base({
    mode,
    environment,
    backend,
    app,
    maintenance,
  }): SystemStatusResponseDTO {
    return {
      mode,
      timestamp: new Date().toISOString(),
      environment,
      backend,
      app,
      maintenance,
    };
  }
}
