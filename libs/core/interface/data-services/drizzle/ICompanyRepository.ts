import { IBaseRepository } from './IBase.repository';
import { CompaniesSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const COMPANY_REPOSITORY_TOKEN = Symbol('COMPANY_REPOSITORY_TOKEN');

/**
 * Repository interface for managing `CompaniesSchema` entities.
 * Extends the base repository with company-specific operations.
 *
 * @extends IBaseRepository<CompaniesSchema>
 */

/**
 * Finds a company by its name.
 *
 * @param name - The name of the company to search for.
 * @returns A promise that resolves to the company entity if found, or `null` otherwise.
 */

/**
 * Creates a new company entity with the provided data and returns the created entity.
 *
 * @param data - Partial data for the new company.
 * @returns A promise that resolves to the newly created company entity.
 */
export interface ICompanyRepository extends IBaseRepository<CompaniesSchema> {
  findByName(name: string): Promise<CompaniesSchema | null>;
  createAndReturn(data: Partial<CompaniesSchema>): Promise<CompaniesSchema>;
  updateById(id: number, data: Partial<CompaniesSchema>): Promise<void>;
}
