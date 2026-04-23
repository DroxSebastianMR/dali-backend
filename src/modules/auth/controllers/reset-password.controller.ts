import { Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResetPasswordService } from "../services/reset-password.service";
import { ResetPasswordSchema } from "../schema/reset-password.schema";
import { ResetPasswordDTO } from "../dtos/reset-password.dto";
import { ValidationPipe } from "@/common/validation/validation.pipe";


@ApiTags('Users - Autenticación')
@Controller('users/auth')
export class ResetPasswordController {
    constructor(private readonly resetPasswordService: ResetPasswordService) {}

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Restablecer contraseña del cliente '})
    @ApiResponse({ status: 200, description: 'Contraseña actualizada '})
    @ApiResponse({ status: 400, description: 'Token inválido o expirado'})
    async resetPassword(
        @Body(new ValidationPipe(ResetPasswordSchema)) body: ResetPasswordDTO,
    ) {
        return this.resetPasswordService.resetPassword(body);
    }
}