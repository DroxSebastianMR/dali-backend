import z from "zod";

export const VerifyResetTokenSchema = z.object({
    token: z.string().min(6),
});

export type VerifyResetTokenInput = z.infer<typeof VerifyResetTokenSchema>;