import { IBaseRepository } from './IBase.repository';
import { SkillsSchema } from '@libs/frameworks/data-services/drizzle/schema';

export const SKILL_REPOSITORY_TOKEN = Symbol('SKILL_REPOSITORY_TOKEN');

/**
 * Repository interface for managing skill entities.
 * Extends the base repository with additional methods specific to skills.
 *
 * @template SkillsSchema - The schema type representing a skill.
 */

/**
 * Finds a skill by its name.
 *
 * @param name - The name of the skill to search for.
 * @returns A promise that resolves to the skill entity if found, or null otherwise.
 */

/**
 * Creates a new skill with the given data and returns the created entity.
 *
 * @param data - An object containing the name of the skill to create.
 * @returns A promise that resolves to the newly created skill entity.
 */
export interface ISkillRepository extends IBaseRepository<SkillsSchema> {
  findByName(name: string): Promise<SkillsSchema | null>;
  createAndReturn(data: Pick<SkillsSchema, 'name'>): Promise<SkillsSchema>;
}
