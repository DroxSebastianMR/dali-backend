import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { FEATURE_MODULES_SYSTEM } from '@/modules/system';
import { FEATURE_MODULES_AUTH } from '@/modules/auth';
import { FEATURE_MODULES_NOTIFICATIONS } from '@/modules/notifications';
import { FEATURE_MODULES_USERS } from '@/modules/users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ...FEATURE_MODULES_SYSTEM,
    ...FEATURE_MODULES_USERS,
    ...FEATURE_MODULES_AUTH,
    ...FEATURE_MODULES_NOTIFICATIONS,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
