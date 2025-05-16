import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { LateCheckInValidationError } from '@/services/errors/late-check-in-validation.error';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found.error';
import { ValidateCheckInService } from '@/services/validate-check-in.service';
import { afterEach } from 'node:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' });
    await sut.execute(createdCheckIn.id);

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(async () => {
      return sut.execute('inexistent-check-in-id');
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40, 0));
    const createdCheckIn = await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' });

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21;
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

    await expect(async () => {
      return sut.execute(createdCheckIn.id);
    }).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
