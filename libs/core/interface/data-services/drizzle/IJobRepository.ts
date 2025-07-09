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

export interface IJobRepository extends IBaseRepository<JobSchema> {
  findDuplicate(params: {
    title: string;
    companyId: number;
    locationId: number;
  }): Promise<JobSchema | null>;
  createAndReturn(data: JobSchema): Promise<JobSchema>;

  findFilteredJobs(filters: JobFilter): Promise<JobSchema[]>;
  countFilteredJobs(filters: JobFilter): Promise<number>;
}
