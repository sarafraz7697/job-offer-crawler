import { IBaseRepository } from './IBase.repository';
import { SkillsSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const SKILL_REPOSITORY_TOKEN = Symbol('SKILL_REPOSITORY_TOKEN');

export interface ISkillRepository extends IBaseRepository<SkillsSchema> {
  findByName(name: string): Promise<SkillsSchema | null>;
  createAndReturn(data: Pick<SkillsSchema, 'name'>): Promise<SkillsSchema>;
}
