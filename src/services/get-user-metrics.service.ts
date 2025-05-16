import type { CheckInsRepository } from '@/repositories/check-ins.repository';

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(userId: string) {
    return this.checkInsRepository.countByUserId(userId);
  }
}
