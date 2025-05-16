import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository';
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.service';

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  return new FetchUserCheckInsHistoryService(checkInsRepository);
}
