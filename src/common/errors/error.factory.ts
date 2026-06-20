import { ErrorCode } from './error-codes';
import { ErrorResponse } from './error-response.type';

export class ErrorFactory {
  static create(params: {
    statusCode: number;
    error: string;
    code: ErrorCode;
    message: string;
    path: string;
    meta?: Record<string, any>;
  }): ErrorResponse {
    return {
      statusCode: params.statusCode,
      error: params.error,
      code: params.code,
      message: params.message,
      timestamp: new Date().toISOString(),
      path: params.path,
      meta: params.meta,
    };
  }
}
