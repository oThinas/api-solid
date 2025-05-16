import type { Gym } from 'generated/prisma';

export abstract class GymsRepository {
  abstract findById(gymId: string): Promise<Gym | null>;
}
