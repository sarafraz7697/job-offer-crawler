import { Inject, Injectable } from '@nestjs/common';
import {
  JOB_REPOSITORY_TOKEN,
  IJobRepository,
  JobFilter,
} from '@libs/core/interface/data-services/drizzle';

/**
 * Use case for retrieving job offers based on provided filters.
 *
 * @remarks
 * This use case fetches a paginated list of job offers and the total count
 * matching the specified filters. It returns both the data and pagination metadata.
 *
 * @param filters - The filtering and pagination options for retrieving job offers.
 * @returns An object containing the filtered job offers and pagination metadata.
 */
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
