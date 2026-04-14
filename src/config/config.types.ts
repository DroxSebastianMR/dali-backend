export interface AppConfig {
  name: string;
  description: string;
  version: string;
  port: number;
  env: string;
  frontendUrl: string;
}

export interface DatabaseConfig {
  url: string;
  type: 'postgres' | 'mysql' | 'sqlite';
  synchronize: boolean;
}
