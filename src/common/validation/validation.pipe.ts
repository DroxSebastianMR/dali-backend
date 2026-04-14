import { PipeTransform, Injectable } from '@nestjs/common';
import { ValidationAdapter } from '@/common/validation/validation.adapter';
import { ZodValidationAdapter } from '@/common/validation/adapters/zod.adapter';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly adapter: ValidationAdapter;

  constructor(private readonly schema: unknown) {
    this.adapter = new ZodValidationAdapter();
  }

  transform(value: unknown) {
    return this.adapter.validate(this.schema, value);
  }
}
