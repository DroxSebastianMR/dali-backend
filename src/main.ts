import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@/config/config.types';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new GlobalExceptionFilter());

  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    throw new Error('No se pudo cargar la configuración de la app');
  }
  app.enableCors({
    origin: appConfig.frontendUrl,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.description)
    .setVersion(appConfig.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(appConfig.port);
  console.log(`🚀 Servidor corriendo en http://localhost:${appConfig.port}`);
  console.log(`📘 Documentación Swagger: http://localhost:${appConfig.port}/api/docs`);
}
bootstrap();
