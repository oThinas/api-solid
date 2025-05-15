import type { CheckInsRepository } from '@/repositories/check-ins.repository';

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

export class CheckInService {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({ gymId, userId }: CheckInServiceRequest) {
    return this.checkInRepository.create({ gym_id: gymId, user_id: userId });
  }
}
