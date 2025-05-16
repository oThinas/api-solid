import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import type { CheckIn, Prisma } from 'generated/prisma';
import type { CheckInsRepository } from '../check-ins.repository';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({ data });
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
  }

  async findManyByUserId(userId: string, page: number) {
    return prisma.checkIn.findMany({ where: { user_id: userId }, take: 20, skip: (page - 1) * 20 });
  }

  async findById(checkInId: string) {
    return prisma.checkIn.findUnique({ where: { id: checkInId } });
  }

  async countByUserId(userId: string) {
    return prisma.checkIn.count({ where: { user_id: userId } });
  }

  async save(data: CheckIn) {
    return prisma.checkIn.update({ where: { id: data.id }, data });
  }
}
