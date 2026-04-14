export interface ValidationAdapter {
  validate<T>(schema: unknown, data: unknown): T;
}
