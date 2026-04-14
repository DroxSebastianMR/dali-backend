import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(errors: any[]) {
    super({
      message: 'VALIDATION_ERROR',
      errors,
    });
  }
}
