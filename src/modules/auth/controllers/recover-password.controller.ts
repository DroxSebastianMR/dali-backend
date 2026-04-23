import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecoverdPasswordService } from '../services/recover-password.service';
import { ValidationPipe } from '@/common/validation/validation.pipe';
import { RecoverPasswordSchema } from '../schema/recover-password.schema';
import { RecoverPasswordDTO } from '../dtos/recover-password.dto';


@ApiTags( 'Users - Autenticación' )
@Controller( 'users/auth' )
export class RecoverPasswordController {
    constructor(private readonly authService: RecoverdPasswordService) {}

    @Post( 'forgor_password' )
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Solicitud de recuperación de contrasñea ' })
    @ApiResponse({ status: 200, description: 'Si el correo existe, se enviará un email' })
    async recoverPassword(
        @Body(new ValidationPipe(RecoverPasswordSchema))  body: RecoverPasswordDTO,
    ) {
        return this.authService.recoverPassword(body);
    }
}