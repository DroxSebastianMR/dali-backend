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
import { LoginUserSchema } from '../schema/login-user.schema';
import { LoginUserDto } from '../dtos/login-user.dto';
import { LogoutSchema } from '../schema/logout.schema';
import { LogoutDTO } from '../dtos/logout.dto';
import { LogoutService } from '../services/logout.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly logoutService: LogoutService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  async login(
    @Body(new ValidationPipe(LoginUserSchema)) body: LoginUserDto,
  ){
    return this.authService.login(body);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar Sesión del usuario' })
  @ApiResponse({ status: 200, description: 'Logout Exitoso', })
  @ApiResponse({ status: 401, description: 'Token Inválido' })
  async logout(
    @Body(new ValidationPipe(LogoutSchema)) body: LogoutDTO,
  ) {
    return this.logoutService.logout(body.refresh_token);
  }

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