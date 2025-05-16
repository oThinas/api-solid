import dayjs from 'dayjs';
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

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).slice((page - 1) * 20, page * 20);
  }
}
