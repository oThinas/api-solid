import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository';
import { CreateGymService } from '../create-gym.service';

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();
  return new CreateGymService(gymsRepository);
}
