import type { UserRepository } from '@/repositories/users.repository';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateServiceRequest) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMatch = await compare(password, user.password_hash);
    if (!isPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
