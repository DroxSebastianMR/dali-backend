import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '@/modules/auth/services/auth.service';
import { RefreshTokenDTO } from '@/modules/auth/dtos/refresh-token.dto';
import { RefreshTokenSchema } from '@/modules/auth/schema/refresh-token.schema';
import { ValidationPipe } from '@/common/validation/validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar access token usando refresh token' })
  @ApiResponse({ status: 200, description: 'Token renovado' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  async refreshToken(
    @Body(new ValidationPipe(RefreshTokenSchema))
    body: RefreshTokenDTO,
  ) {
    return this.authService.refreshToken(body);
  }
}