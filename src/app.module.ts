import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { FEATURE_MODULES_SYSTEM } from '@/modules/system';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ...FEATURE_MODULES_SYSTEM
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
