import { Inject, Injectable } from '@nestjs/common';
import {
  JOB_REPOSITORY_TOKEN,
  IJobRepository,
  JobFilter,
} from '@libs/core/interface/data-services/drizzle';

@Injectable()
export class GetJobOffersUseCase {
  constructor(
    @Inject(JOB_REPOSITORY_TOKEN)
    private readonly jobRepository: IJobRepository,
  ) {}

  async execute(filters: JobFilter) {
    const [jobs, total] = await Promise.all([
      this.jobRepository.findFilteredJobs(filters),
      this.jobRepository.countFilteredJobs(filters),
    ]);

    return {
      data: jobs,
      meta: {
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit!),
      },
    };
  }
}
