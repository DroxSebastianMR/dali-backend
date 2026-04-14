import { PLATFORMS } from "@/modules/system/Types/system.types";

export const MOBILE_PLATFORMS = [
  PLATFORMS.IOS,
  PLATFORMS.ANDROID,
] as const;

export type MobilePlatform = typeof MOBILE_PLATFORMS[number];