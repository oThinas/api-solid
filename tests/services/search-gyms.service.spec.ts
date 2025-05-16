import type { GymsRepository } from '@/repositories/gyms.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { SearchGymsService } from '@/services/search-gyms.service';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: GymsRepository;
let sut: SearchGymsService;

describe('Search Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.5287234,
      longitude: -46.660879,
    });

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -23.5287234,
      longitude: -46.660879,
    });

    const gyms = await sut.execute({ query: 'Javascript', page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ]);
  });

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5287234,
        longitude: -46.660879,
      });
    }

    const gyms = await sut.execute({ query: 'Javascript', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym 21',
      }),
      expect.objectContaining({
        title: 'Javascript Gym 22',
      }),
    ]);
  });
});
