import { Module } from '@nestjs/common';
import { UsersController }
    from '@/modules/users/controllers/users.controller';
import { UsersService }
    from '@/modules/users/services/users.services';
import { PrismaService }
    from '@/common/prisma/prisma.service';
import { AuthModule }
    from '@/modules/auth/auth.module';

@Module({
    imports: [
        AuthModule,
    ],

    controllers: [
        UsersController,
    ],

    providers: [
        UsersService,
        PrismaService,
    ],

    exports: [
        UsersService,
    ],
})

export class UsersModule {}