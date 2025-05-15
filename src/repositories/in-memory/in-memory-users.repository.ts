import type { Prisma, User } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import type { UserRepository } from '../users.repository';

export class InMemoryUsersRepository implements UserRepository {
  public users: User[] = [];

  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user ?? null;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user ?? null;
  }
}
