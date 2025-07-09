import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import { ISkillRepository } from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';
import {
  skills,
  SkillsSchema,
} from '@libs/frameworks/data-services/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SkillRepository
  extends BaseRepository<SkillsSchema>
  implements ISkillRepository
{
  constructor(@Inject(DATA_SERVICE_TOKEN) dataService: IDataservice) {
    super(dataService);
  }

  protected get table() {
    return skills;
  }

  async findByName(name: string): Promise<SkillsSchema | null> {
    const result = await this.dataService
      .select()
      .from(this.table)
      .where(eq(this.table.name, name))
      .limit(1);
    return result[0] ?? null;
  }

  async createAndReturn(
    data: Pick<SkillsSchema, 'name'>,
  ): Promise<SkillsSchema> {
    const result = await this.dataService
      .insert(this.table)
      .values(data)
      .returning();
    return result[0];
  }
}
