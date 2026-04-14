import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { PLATFORMS } from "@/modules/system/Types/system.types";

extendZodWithOpenApi(z);

export const SystemStatusSchema = z.object({
  appVersion: z.string().optional().openapi({
    example: "1.0.9",
    description: "Versión actual de la app cliente",
  }),

  platform: z.nativeEnum(PLATFORMS).openapi({
    example: PLATFORMS.IOS,
    description: "Plataforma cliente",
  }),
});

export type SystemStatusInput = z.infer<typeof SystemStatusSchema>;
