import { prisma } from '@/lib/prisma';
import type { Gym, Prisma } from 'generated/prisma';
import type { FindManyNearbyRequest, GymsRepository } from '../gyms.repository';

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return prisma.gym.create({ data });
  }

  async findById(gymId: string) {
    return prisma.gym.findUnique({ where: { id: gymId } });
  }

  async findMany(query: string, page: number) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyRequest) {
    return prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
  }
}
