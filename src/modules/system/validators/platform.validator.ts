import { BadRequestException } from '@nestjs/common';
import { MOBILE_PLATFORMS } from '@/modules/system/constants/mobile-platforms';

export class PlatformValidator {
  static validate(platform: string) {
    if (!MOBILE_PLATFORMS.includes(platform as any)) {
      throw new BadRequestException(`Plataforma no soportada: ${platform}`);
    }
  }
}
