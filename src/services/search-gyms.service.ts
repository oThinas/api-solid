import type { GymsRepository } from '@/repositories/gyms.repository';

interface SearchGymsServiceRequest {
  query: string;
  page: number;
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ page, query }: SearchGymsServiceRequest) {
    return await this.gymsRepository.findMany(query, page);
  }
}
