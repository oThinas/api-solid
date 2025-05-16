import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { CheckInService } from '@/services/check-in.service';
import { afterEach } from 'node:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const checkIn = await sut.execute({ gymId: 'gym-01', userId: 'user-01' });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const checkInBody = { gymId: 'gym-01', userId: 'user-01' };
    await sut.execute(checkInBody);
    await expect(async () => {
      return sut.execute(checkInBody);
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    const checkInBody = { gymId: 'gym-01', userId: 'user-01' };
    await sut.execute(checkInBody);

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const checkIn = await sut.execute(checkInBody);

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
