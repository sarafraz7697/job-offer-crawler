import * as drizzle from 'drizzle-orm';
import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import {
  CreateJobInput,
  IJobRepository,
  JobFilter,
} from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';
import { jobs, JobSchema } from '@libs/frameworks/data-services/drizzle/schema';

@Injectable()
export class JobRepository
  extends BaseRepository<JobSchema>
  implements IJobRepository
{
  constructor(@Inject(DATA_SERVICE_TOKEN) dataService: IDataservice) {
    super(dataService);
  }

  protected get table() {
    return jobs;
  }

  async findDuplicate(params: {
    title: string;
    companyId: number;
    locationId: number;
  }): Promise<JobSchema | null> {
    const { title, companyId, locationId } = params;

    const result = await this.dataService
      .select()
      .from(this.table)
      .where(
        drizzle.and(
          drizzle.eq(this.table.title, title),
          drizzle.eq(this.table.companyId, companyId),
          drizzle.eq(this.table.locationId, locationId),
        ),
      );

    return result[0] ?? null;
  }

  async createAndReturn(data: CreateJobInput): Promise<JobSchema> {
    const result = await this.dataService
      .insert(this.table)
      .values(data)
      .returning();
    return result[0];
  }

  async findFilteredJobs(filters: JobFilter): Promise<JobSchema[]> {
    const where: drizzle.SQL[] = [];

    if (filters.title) {
      where.push(drizzle.like(jobs.title, `%${filters.title}%`));
    }

    if (filters.locationId) {
      where.push(drizzle.eq(jobs.locationId, filters.locationId));
    }

    if (filters.salaryMin) {
      where.push(drizzle.gte(jobs.salaryMin, filters.salaryMin));
    }

    if (filters.salaryMax) {
      where.push(drizzle.lte(jobs.salaryMax, filters.salaryMax));
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const offset = (page - 1) * limit;

    return this.dataService
      .select()
      .from(jobs)
      .where(where.length ? drizzle.and(...where) : undefined)
      .limit(limit)
      .offset(offset);
  }

  async countFilteredJobs(filters: JobFilter): Promise<number> {
    const where: drizzle.SQL[] = [];

    if (filters.title) {
      where.push(drizzle.like(jobs.title, `%${filters.title}%`));
    }

    if (filters.locationId) {
      where.push(drizzle.eq(jobs.locationId, filters.locationId));
    }

    if (filters.salaryMin) {
      where.push(drizzle.gte(jobs.salaryMin, filters.salaryMin));
    }

    if (filters.salaryMax) {
      where.push(drizzle.lte(jobs.salaryMax, filters.salaryMax));
    }

    const result = await this.dataService
      .select({ count: drizzle.count() })
      .from(jobs)
      .where(where.length ? drizzle.and(...where) : undefined);

    return Number(result[0]?.count ?? 0);
  }
}
