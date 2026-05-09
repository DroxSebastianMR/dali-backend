import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';

import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UsersService } from '@/modules/users/services/users.services';
import { MeResponseDTO } from '@/modules/users/dto/me-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')

export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)

    @ApiOperation({
        summary:
            'Obtener información del usuario autenticado',
    })

    @ApiResponse({
        status: 200,
        description:
            'Información obtenida correctamente',
        type: MeResponseDTO,
    })

    @ApiResponse({
        status: 401,
        description:
            'No autorizado',
    })

    async me(
        @CurrentUser('sub')
        userId: number,
    ) {
        return this.usersService.me(userId);
    }
}