import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { CheckInService } from '@/services/check-in.service';
import { Prisma } from 'generated/prisma';
import { afterEach } from 'node:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.gyms.push({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Gym 01 description',
      latitude: new Prisma.Decimal(-23.5287234),
      longitude: new Prisma.Decimal(-46.660879),
      phone: '',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const checkIn = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5287234,
      userLongitude: -46.660879,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const checkInBody = { gymId: 'gym-01', userId: 'user-01', userLatitude: -23.5287234, userLongitude: -46.660879 };
    await sut.execute(checkInBody);
    await expect(async () => {
      return sut.execute(checkInBody);
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    const checkInBody = { gymId: 'gym-01', userId: 'user-01', userLatitude: -23.5287234, userLongitude: -46.660879 };
    await sut.execute(checkInBody);

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const checkIn = await sut.execute(checkInBody);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in at distante gyms', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      title: 'Gym 02',
      description: 'Gym 02 description',
      latitude: new Prisma.Decimal(-23.46379),
      longitude: new Prisma.Decimal(-46.5193484),
      phone: '',
    });

    await expect(async () => {
      return sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5287234,
        userLongitude: -46.660879,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
