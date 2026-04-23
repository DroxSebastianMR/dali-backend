import { z } from 'zod';

export const CreateNotificationSchema = z.object({
    userId: z.number().int().positive(),
    businessId: z.number().int().positive().optional(),
    title: z.string().min(3),
    body: z.string().min(5),
    type: z.string(),
});

export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;