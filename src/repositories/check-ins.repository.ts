import type { CheckIn, Prisma } from 'generated/prisma';

export abstract class CheckInsRepository {
  abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
