import { UpdateType } from '@prisma/client';

export const UPDATE_MESSAGES: Record<
  UpdateType,
  { required: string; optional: string }
> = {
  PATCH: {
    required: 'Actualiza la app para corregir errores importantes.',
    optional: 'Hay correcciones y mejoras disponibles.',
  },
  MINOR: {
    required: 'Actualización recomendada con nuevas funciones.',
    optional: 'Nueva versión disponible con novedades.',
  },
  MAJOR: {
    required: 'Actualización obligatoria para continuar usando la app.',
    optional: 'Actualización importante disponible.',
  },
};
