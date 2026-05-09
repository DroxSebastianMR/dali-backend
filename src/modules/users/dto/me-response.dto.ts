import { ApiProperty } from '@nestjs/swagger';

class UserDTO {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    nombre?: string;

    @ApiProperty()
    apellido?: string;

    @ApiProperty({ nullable: true })
    telefono?: string | null;

    @ApiProperty({ nullable: true })
    foto_url?: string | null;

    @ApiProperty()
    estado?: string;

    @ApiProperty()
    email_verified?: boolean;

    @ApiProperty()
    telefono_verified?: boolean;

    @ApiProperty({ nullable: true })
    last_login_at?: Date | null;

    @ApiProperty()
    created_at?: Date;
}

class RoleDTO {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    name?: string | null;
}

class AuthorizationDTO {
    @ApiProperty({
        type: [RoleDTO],
    })
    roles?: RoleDTO[];
}

class MetaDTO {
    @ApiProperty()
    server_time?: string;

    @ApiProperty()
    enviroment?: string;
}

export class MeResponseDTO {
    @ApiProperty({
        type: UserDTO,
    })
    user?: UserDTO;

    @ApiProperty({
        type: AuthorizationDTO,
    })
    authorization?: AuthorizationDTO;

    @ApiProperty({
        type: MetaDTO,
    })
    meta?: MetaDTO;
}