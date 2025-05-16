import type { CheckInsRepository } from '@/repositories/check-ins.repository';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { FetchUserCheckInsHistoryService } from '@/services/fetch-user-check-ins-history.service';
import { beforeEach, describe, expect, it } from 'vitest';

let checkInsRepository: CheckInsRepository;
let sut: FetchUserCheckInsHistoryService;

describe('Fetch User Check-Ins History Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryService(checkInsRepository);
  });

  it('should be able to fetch check-ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const checkIns = await sut.execute({ userId: 'user-01', page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
        user_id: 'user-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
        user_id: 'user-01',
      }),
    ]);
  });

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      });
    }

    const checkIns = await sut.execute({ userId: 'user-01', page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
        user_id: 'user-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
        user_id: 'user-01',
      }),
    ]);
  });
});
