import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found.error';
import { GetUserProfileService } from '@/services/get-user-profile.service';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it('should be able to get a user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { id, name } = await sut.execute(createdUser.id);
    expect(id).toEqual(expect.any(String));
    expect(name).toEqual('John Doe');
  });

  it('should not be able to get a user profile with wrong id', async () => {
    await expect(async () => {
      return sut.execute('non-existing-id');
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
