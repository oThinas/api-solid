import type { UserRepository } from '@/repositories/users.repository';
import { hash } from 'bcryptjs';
import { EmailAlreadyExistsError } from './errors/email-already-exists.error';

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    return this.userRepository.create({ email, name, password_hash });
  }
}
