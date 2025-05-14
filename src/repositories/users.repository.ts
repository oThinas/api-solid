import type { Prisma, User } from 'generated/prisma';

export abstract class UserRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
