import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository';
import { GetUserMetricsService } from '../get-user-metrics.service';

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  return new GetUserMetricsService(checkInsRepository);
}
