import { ErrorCode } from './error-codes';

export type ErrorResponse = {
  statusCode: number;
  error: string;
  code: ErrorCode;
  message: string;
  timestamp: string;
  path: string;
  meta?: Record<string, any>;
};
