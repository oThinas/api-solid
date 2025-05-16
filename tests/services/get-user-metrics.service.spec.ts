import type { CheckInsRepository } from '@/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { GetUserMetricsService } from '@/services/get-user-metrics.service';
import { beforeEach, describe, expect, it } from 'vitest';

let checkInsRepository: CheckInsRepository;
let sut: GetUserMetricsService;

describe('Get User Metrics Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it('should be able to get check-ins counts from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const checkInsCount = await sut.execute('user-01');
    expect(checkInsCount).toEqual(2);
  });
});
