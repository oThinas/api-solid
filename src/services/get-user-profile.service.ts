import type { UserRepository } from '@/repositories/users.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

export class GetUserProfileService {
  constructor(private usersRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }
}
