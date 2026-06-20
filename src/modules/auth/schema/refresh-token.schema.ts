import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export const RefreshTokenSchema = z.object({
  refresh_token: z
    .string()
    .min(10)
    .openapi({ example: 'refresh_token_example' }),
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
