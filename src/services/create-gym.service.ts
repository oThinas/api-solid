import type { GymsRepository } from '@/repositories/gyms.repository';

interface CreateGymServiceRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(data: CreateGymServiceRequest) {
    return this.gymsRepository.create(data);
  }
}
