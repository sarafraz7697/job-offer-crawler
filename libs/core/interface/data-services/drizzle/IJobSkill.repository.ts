import { IBaseRepository } from './IBase.repository';
import { JobSkillsSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const JOB_SKILL_REPOSITORY_TOKEN = Symbol('JOB_SKILL_REPOSITORY_TOKEN');

export interface IJobSkillRepository extends IBaseRepository<JobSkillsSchema> {
  linkJobSkill(jobId: number, skillId: number): Promise<void>;
}
