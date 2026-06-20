import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidationException } from '@/common/validation/validation.exception';
import { ErrorFactory } from '@/common/errors/error.factory';
import { ErrorCode } from '@/common/errors/error-codes';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof ValidationException) {
      return response.status(HttpStatus.BAD_REQUEST).json(
        ErrorFactory.create({
          statusCode: 400,
          error: 'BAD_REQUEST',
          code: ErrorCode.INVALID_CREDENTIALS,
          message: 'Error de validación',
          path: request.url,
          meta: {
            details: exception.getResponse(),
          },
        }),
      );
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        return response.status(status).json(exceptionResponse);
      }

      return response.status(status).json(
        ErrorFactory.create({
          statusCode: status,
          error: 'HTTP_EXCEPTION',
          code: ErrorCode.UNAUTHORIZED,
          message: exceptionResponse as string,
          path: request.url,
        }),
      );
    }
    console.error(exception);

    return response.status(500).json(
      ErrorFactory.create({
        statusCode: 500,
        error: 'INTERNAL_SERVER_ERROR',
        code: ErrorCode.INTERNAL_ERROR ?? 'INTERNAL_ERROR',
        message: 'Error interno del servidor',
        path: request.url,
      }),
    );
  }
}
