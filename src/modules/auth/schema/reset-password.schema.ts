import z from "zod";


export const ResetPasswordSchema = z.object({
    token: z.string().min(20),
    new_password: z.string().min(8),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;