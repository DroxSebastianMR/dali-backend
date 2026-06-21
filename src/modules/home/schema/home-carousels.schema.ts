import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export const HomeCarouselsSchema = z.object({
  latitude: z.number().openapi({
    example: -8.111763,
  }),

  longitude: z.number().openapi({
    example: -79.028687,
  }),
});

export type HomeCarouselsInput = z.infer<typeof HomeCarouselsSchema>;
