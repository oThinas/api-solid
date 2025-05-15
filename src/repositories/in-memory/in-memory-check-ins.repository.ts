import type { CheckIn, Prisma } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import type { CheckInsRepository } from '../check-ins.repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create({ gym_id, user_id, validated_at }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      user_id,
      gym_id,
      id: randomUUID(),
      created_at: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
    };

    this.checkIns.push(checkIn);
    return checkIn;
  }
}
