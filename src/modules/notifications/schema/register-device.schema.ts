import { z } from 'zod';

export const RegisterDeviceSchema = z.object({
  deviceToken: z.string().min(1, 'El token es obligatorio'),
  deviceId: z.string().min(1, 'El ID del dispositivo es obligatorio'),
  platform: z.enum(['ANDROID', 'IOS', 'WEB']),
  model: z.string().optional(),
});

export type RegisterDeviceType = z.infer<typeof RegisterDeviceSchema>;
