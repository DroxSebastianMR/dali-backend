import { z } from 'zod';

export const JwtConfigSchema = z.object({
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_ISSUER: z.string().optional(),
  JWT_AUDIENCE: z.string().optional(),
});

export type JwtConfig = z.infer<typeof JwtConfigSchema>;
