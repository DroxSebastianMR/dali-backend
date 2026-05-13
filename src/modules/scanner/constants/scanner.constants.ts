export const SCANNER_CONSTANTS = {
  MAX_IMAGE_SIZE:
    10 * 1024 * 1024,

  ALLOWED_MIME_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ],
} as const;