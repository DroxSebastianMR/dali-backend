import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from '@/common/validation/validation.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ValidationException) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        error: 'VALIDATION_ERROR',
        details: exception.getResponse(),
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json(exception.getResponse());
    }

    console.error(exception);

    return response.status(500).json({
      statusCode: 500,
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
}
