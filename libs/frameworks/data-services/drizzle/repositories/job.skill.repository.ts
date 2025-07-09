import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import { IJobSkillRepository } from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';
import {
  jobSkills,
  JobSkillsSchema,
} from '@libs/frameworks/data-services/drizzle/schema';

@Injectable()
export class JobSkillRepository
  extends BaseRepository<JobSkillsSchema>
  implements IJobSkillRepository
{
  constructor(@Inject(DATA_SERVICE_TOKEN) dataService: IDataservice) {
    super(dataService);
  }

  protected get table() {
    return jobSkills;
  }

  async linkJobSkill(jobId: number, skillId: number): Promise<void> {
    await this.dataService
      .insert(this.table)
      .values({ jobId, skillId })
      .execute();
  }
}
