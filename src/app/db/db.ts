import { Role } from '@prisma/client';
import prisma from '../../shared/prisma';
import bcrypt from 'bcrypt';

export const initiateSuperAdmin = async () => {
  const payload = {
    firstName: 'Super',
    lastName: 'Admin',
    userName: 'superAdmin',
    email: 'superadmin@gmail10p.com',
    password: '123456',
    role: Role.SUPER_ADMIN,
  };

  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingSuperAdmin) {
    return;
  }

  await prisma.$transaction(async (TransactionClient) => {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    await TransactionClient.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload?.lastName,
        email: payload.email,
        password: hashedPassword,
        role: payload.role,
      },
    });

    await TransactionClient.admin.create({
        data: {
          email: payload.email,
          userName: payload.userName,
        },
      });

  });
};
