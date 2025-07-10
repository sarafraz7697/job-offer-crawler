import { UnifiedJobDto } from '@libs/dtos';
import { InferInsertModel } from 'drizzle-orm';
import { IBaseRepository } from './IBase.repository';
import { jobs, JobSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const JOB_REPOSITORY_TOKEN = Symbol('JOB_REPOSITORY_TOKEN');
export type CreateJobInput = InferInsertModel<typeof jobs>;

export interface JobFilter {
  title?: string;
  locationId?: number;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}

/**
 * Repository interface for managing job entities.
 * Extends the base repository with job-specific operations.
 */
export interface IJobRepository extends IBaseRepository<JobSchema> {
  /**
   * Finds a duplicate job based on the given title, company, and location.
   * @param params - The parameters to identify a duplicate job.
   * @param params.title - The job title.
   * @param params.companyId - The ID of the company.
   * @param params.locationId - The ID of the location.
   * @returns A promise that resolves to the duplicate job if found, otherwise null.
   */
  findDuplicate(params: {
    title: string;
    companyId: number;
    locationId: number;
  }): Promise<JobSchema | null>;

  /**
   * Creates a new job and returns the created entity.
   * @param data - The job data to create.
   * @returns A promise that resolves to the created job entity.
   */
  createAndReturn(data: JobSchema): Promise<JobSchema>;

  /**
   * Finds jobs that match the specified filters.
   * @param filters - The filters to apply to the job search.
   * @returns A promise that resolves to an array of matching jobs.
   */
  findFilteredJobs(filters: JobFilter): Promise<JobSchema[]>;

  /**
   * Counts the number of jobs that match the specified filters.
   * @param filters - The filters to apply to the job count.
   * @returns A promise that resolves to the number of matching jobs.
   */
  countFilteredJobs(filters: JobFilter): Promise<number>;
}
