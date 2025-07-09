import { IBaseRepository } from './IBase.repository';
import { CompaniesSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const COMPANY_REPOSITORY_TOKEN = Symbol('COMPANY_REPOSITORY_TOKEN');

export interface ICompanyRepository extends IBaseRepository<CompaniesSchema> {
  findByName(name: string): Promise<CompaniesSchema | null>;
  createAndReturn(data: Partial<CompaniesSchema>): Promise<CompaniesSchema>;
}
