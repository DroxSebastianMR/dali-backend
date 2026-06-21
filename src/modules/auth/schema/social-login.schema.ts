import { z } from 'zod';

export const SocialLoginSchema = z.object({
  provider: z.enum(['google']),
  token: z.string().min(1),
});

export type SocialLoginInput = z.infer<typeof SocialLoginSchema>;
