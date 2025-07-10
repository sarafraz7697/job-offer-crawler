import { IBaseRepository } from './IBase.repository';
import { JobSkillsSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const JOB_SKILL_REPOSITORY_TOKEN = Symbol('JOB_SKILL_REPOSITORY_TOKEN');

/**
 * Repository interface for managing job skill entities.
 * Extends the base repository with additional functionality to link jobs and skills.
 *
 * @extends IBaseRepository<JobSkillsSchema>
 */

/**
 * Links a job with a skill by their respective IDs.
 *
 * @param jobId - The unique identifier of the job.
 * @param skillId - The unique identifier of the skill.
 * @returns A promise that resolves when the link operation is complete.
 */
export interface IJobSkillRepository extends IBaseRepository<JobSkillsSchema> {
  linkJobSkill(jobId: number, skillId: number): Promise<void>;
}
