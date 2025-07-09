import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import {
  CreateJobInput,
  IJobRepository,
} from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';
import { jobs, JobSchema } from '@libs/frameworks/data-services/drizzle/schema';
import { UnifiedJobDto } from '@libs/dtos';
import * as drizzle from 'drizzle-orm';

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
}
