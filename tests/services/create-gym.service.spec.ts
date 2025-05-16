import type { GymsRepository } from '@/repositories/gyms.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { CreateGymService } from '@/services/create-gym.service';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: GymsRepository;
let sut: CreateGymService;

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it('should be able to create a gym', async () => {
    const gym = await sut.execute({
      title: 'Gym 01',
      description: null,
      phone: null,
      latitude: -23.5287234,
      longitude: -46.660879,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
