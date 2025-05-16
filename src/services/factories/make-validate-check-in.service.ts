import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository';
import { ValidateCheckInService } from '../validate-check-in.service';

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  return new ValidateCheckInService(checkInsRepository);
}
