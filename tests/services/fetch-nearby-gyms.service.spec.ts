import type { GymsRepository } from '@/repositories/gyms.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { FetchNearbyGymsService } from '@/services/fetch-nearby-gyms.service';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: GymsRepository;
let sut: FetchNearbyGymsService;

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.5287234,
      longitude: -46.660879,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -20.7255962,
      longitude: -40.93398,
    });

    const gyms = await sut.execute({ userLatitude: -23.5287234, userLongitude: -46.660879 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ]);
  });
});
