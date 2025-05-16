import type { Gym, Prisma } from 'generated/prisma';

export abstract class GymsRepository {
  abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
  abstract findById(gymId: string): Promise<Gym | null>;
}
