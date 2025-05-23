import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { AuthenticateService } from '@/services/authenticate.service';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials.error';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const user = await sut.execute({ email: 'johndoe@example.com', password: '123456' });
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(async () => {
      return sut.execute({ email: 'johndoe@example.com', password: '123456' });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await expect(async () => {
      return sut.execute({ email: 'johndoe@example.com', password: '123123' });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
