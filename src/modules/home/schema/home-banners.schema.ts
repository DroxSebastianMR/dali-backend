import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

export const HomeBannersSchema = z.object({
  latitude: z.number().openapi({
    example: -8.111763,
  }),

  longitude: z.number().openapi({
    example: -79.028687,
  }),

  city: z.string().optional().openapi({
    example: 'Trujillo',
  }),

  district: z.string().optional().openapi({
    example: 'Víctor Larco',
  }),
});

export type HomeBannersInput = z.infer<typeof HomeBannersSchema>;
