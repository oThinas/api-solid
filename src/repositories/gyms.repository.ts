import type { Gym, Prisma } from 'generated/prisma';

export interface FindManyNearbyRequest {
  latitude: number;
  longitude: number;
}

export abstract class GymsRepository {
  abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
  abstract findById(gymId: string): Promise<Gym | null>;
  abstract findMany(query: string, page: number): Promise<Gym[]>;
  abstract findManyNearby({ latitude, longitude }: FindManyNearbyRequest): Promise<Gym[]>;
}
