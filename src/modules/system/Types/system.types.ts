export const PLATFORMS = {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
} as const;

export type Platform = (typeof PLATFORMS)[keyof typeof PLATFORMS];
export const BACKEND_STATUS = {
  OK: 'OK',
  MAINTENANCE: 'MAINTENANCE',
  OFFLINE: 'OFFLINE',
} as const;

export type BackendStatus =
  (typeof BACKEND_STATUS)[keyof typeof BACKEND_STATUS];

export const SYSTEM_MODE = {
  OK: 'OK',
  MAINTENANCE: 'MAINTENANCE',
  UPDATE_REQUIRED: 'UPDATE_REQUIRED',
} as const;

export type SystemMode = (typeof SYSTEM_MODE)[keyof typeof SYSTEM_MODE];
