import { z } from 'zod';

export const RecoverPasswordSchema = z.object({
    email: z.string().email(),
});

export type RecoverPasswordInput = z.infer<typeof RecoverPasswordSchema>;