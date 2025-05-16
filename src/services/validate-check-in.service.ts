import type { CheckInsRepository } from '@/repositories/check-ins.repository';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(checkInId: string) {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');
    if (differenceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);
    return checkIn;
  }
}
