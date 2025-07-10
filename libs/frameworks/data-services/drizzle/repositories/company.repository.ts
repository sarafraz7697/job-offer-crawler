import { BaseRepository } from './base.repository';
import { Injectable, Inject } from '@nestjs/common';
import {
  ICompanyRepository,
  ISkillRepository,
} from '@libs/core/interface/data-services/drizzle';
import {
  IDataservice,
  DATA_SERVICE_TOKEN,
} from '@libs/core/interface/services';
import {
  companies,
  CompaniesSchema,
  SkillsSchema,
} from '@libs/frameworks/data-services/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompaniesRepository
  extends BaseRepository<CompaniesSchema>
  implements ICompanyRepository
{
  constructor(@Inject(DATA_SERVICE_TOKEN) dataService: IDataservice) {
    super(dataService);
  }

  protected get table() {
    return companies;
  }

  async findByName(name: string): Promise<CompaniesSchema | null> {
    const result = await this.dataService
      .select()
      .from(this.table)
      .where(eq(this.table.name, name))
      .limit(1);
    return result[0] ?? null;
  }

  async createAndReturn(
    data: Pick<SkillsSchema, 'name'>,
  ): Promise<CompaniesSchema> {
    const result = await this.dataService
      .insert(this.table)
      .values(data)
      .returning();
    return result[0];
  }

  async updateById(id: number, data: Partial<CompaniesSchema>): Promise<void> {
    await this.dataService
      .update(companies)
      .set(data)
      .where(eq(companies.id, id));
  }
}
