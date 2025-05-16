import type { CheckInsRepository } from '@/repositories/check-ins.repository';

interface FetchUserCheckInsHistoryServiceRequest {
  userId: string;
  page: number;
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ page, userId }: FetchUserCheckInsHistoryServiceRequest) {
    return this.checkInsRepository.findManyByUserId(userId, page);
  }
}
