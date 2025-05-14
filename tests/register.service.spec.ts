import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists.error';
import { RegisterService } from '@/services/register.service';
import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

describe('Register Service', () => {
  it('should be able to register a new user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const user = await registerService.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });
    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const user = await registerService.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with the same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const email = 'johndoe@example.com';

    await registerService.execute({ email, name: 'John Doe', password: '123456' });

    await expect(async () => {
      return registerService.execute({ email, name: 'John Doe', password: '123456' });
    }).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
