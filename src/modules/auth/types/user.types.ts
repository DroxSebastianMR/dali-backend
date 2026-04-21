import { Prisma } from '@prisma/client';

export type UserWithRoles = Prisma.UserGetPayload<{
    include: {
        user_roles: {
            include: {
            role: true;
            };
        };
    };
}>;