import type { GymsRepository } from '@/repositories/gyms.repository';

interface FetchNearbyGymsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsServiceRequest) {
    return this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude });
  }
}
