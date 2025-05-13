import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerService({ email, name, password }: RegisterServiceRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } });
  if (userWithSameEmail) {
    throw new Error('Email already in use');
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
