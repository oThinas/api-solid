import { type Gym, Prisma } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import type { GymsRepository } from '../gyms.repository';

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);
    return gym ?? null;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.gyms.push(gym);

    return gym;
  }

  async findMany(query: string, page: number) {
    return this.gyms.filter((gym) => gym.title.includes(query)).slice((page - 1) * 20, page * 20);
  }
}
