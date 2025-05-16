import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository';
import { FetchNearbyGymsService } from '../fetch-nearby-gyms.service';

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  return new FetchNearbyGymsService(gymsRepository);
}
