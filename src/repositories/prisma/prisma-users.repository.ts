import { prisma } from '@/lib/prisma';
import type { Prisma } from 'generated/prisma';
import type { UserRepository } from '../users.repository';

export class PrismaUsersRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
