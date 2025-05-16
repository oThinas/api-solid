import type { CheckInsRepository } from '@/repositories/check-ins.repository';
import type { GymsRepository } from '@/repositories/gyms.repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1;

export class CheckInService {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({ gymId, userId, userLatitude, userLongitude }: CheckInServiceRequest) {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
    );

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date());
    if (checkInOnSameDate) {
      throw new Error();
    }

    return this.checkInRepository.create({ gym_id: gymId, user_id: userId });
  }
}
