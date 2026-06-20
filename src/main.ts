import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';

import { AppModule } from '@/app.module';

import { AppConfig } from '@/config/config.types';

import { PrismaService } from '@/common/prisma/prisma.service';

import { MaintenanceGuard } from '@/common/guards/maintenance.guard';

import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const prisma = app.get(PrismaService);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalGuards(new MaintenanceGuard(prisma));
  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    throw new Error('No se pudo cargar la configuración de la aplicación');
  }

  app.enableCors({
    origin: appConfig.frontendUrl,
    credentials: true,
  });
  setupSwagger(app, appConfig);

  const port = Number(process.env.PORT) || appConfig.port || 3000;

  await app.listen(port, '0.0.0.0');
  logServerInfo(port);
}

function setupSwagger(app: any, config: AppConfig) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.name)
    .setDescription(config.description)
    .setVersion(config.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);
}

function logServerInfo(port: number) {
  console.log('');

  console.log(`🚀 Servidor corriendo en puerto ${port}`);

  console.log(`🌐 API Local: http://localhost:${port}`);

  console.log(`📘 Swagger Local: http://localhost:${port}/api/docs`);

  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    console.log(
      `☁️ API Producción: https://${process.env.RAILWAY_PUBLIC_DOMAIN}`,
    );

    console.log(
      `📘 Swagger Producción: https://${process.env.RAILWAY_PUBLIC_DOMAIN}/api/docs`,
    );
  }

  console.log('');
}

bootstrap();
