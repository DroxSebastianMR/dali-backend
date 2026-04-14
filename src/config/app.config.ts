import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.types';

export default registerAs('app', (): AppConfig => ({
  name: 'DALI API',
  description: 'Backend de SHARKPLUSS',
  version: '1.0.0',
  port: 3000,
  env: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
}));