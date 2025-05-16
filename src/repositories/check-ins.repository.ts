import type { CheckIn, Prisma } from 'generated/prisma';

export abstract class CheckInsRepository {
  abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  abstract findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  abstract findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  abstract findById(checkInId: string): Promise<CheckIn | null>;
  abstract countByUserId(userId: string): Promise<number>;
  abstract save(checkIn: CheckIn): Promise<CheckIn>;
}
