import { ApiProperty } from '@nestjs/swagger';
import { UpdateType } from '@prisma/client';
import {
  BACKEND_STATUS,
  SYSTEM_MODE,
} from '@/modules/system/Types/system.types';
import type {
  BackendStatus,
  SystemMode,
} from '@/modules/system/Types/system.types';

class UpdateDTO {
  @ApiProperty({ example: true })
  required!: boolean;

  @ApiProperty({ enum: UpdateType })
  type!: UpdateType;

  @ApiProperty({ example: 'Actualización obligatoria.' })
  message!: string;

  @ApiProperty({ nullable: true })
  storeUrl!: string | null;
}

class AppDTO {
  @ApiProperty()
  currentVersion!: string;

  @ApiProperty()
  minSupportedVersion!: string;

  @ApiProperty()
  clientVersion!: string | null;

  @ApiProperty({ nullable: true })
  update!: UpdateDTO | null;
}

class MaintenanceDTO {
  @ApiProperty()
  enabled!: boolean;

  @ApiProperty({ nullable: true })
  message!: string | null;

  @ApiProperty({ nullable: true })
  estimatedEnd!: string | null;
}

class BackendDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  version!: string;

  @ApiProperty({ enum: BACKEND_STATUS })
  status!: BackendStatus;
}

export class SystemStatusResponseDTO {
  @ApiProperty({ enum: SYSTEM_MODE })
  mode!: SystemMode;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  environment!: string;

  @ApiProperty({ type: BackendDTO })
  backend!: BackendDTO;

  @ApiProperty({ type: AppDTO })
  app!: AppDTO;

  @ApiProperty({ type: MaintenanceDTO })
  maintenance!: MaintenanceDTO;
}
