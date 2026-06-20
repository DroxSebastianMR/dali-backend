import { ZodSchema } from 'zod';
import { ValidationAdapter } from '@/common/validation/validation.adapter';
import { ValidationException } from '@/common/validation/validation.exception';

export class ZodValidationAdapter implements ValidationAdapter {
  validate<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new ValidationException(result.error.issues);
    }

    return result.data;
  }
}
