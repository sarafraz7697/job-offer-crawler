import { InferSelectModel } from 'drizzle-orm';
import { jobs } from './jobs';
import { skills } from './skills';
import { pgTable, integer, serial } from 'drizzle-orm/pg-core';

export const jobSkills = pgTable('job_skills', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id')
    .notNull()
    .references(() => jobs.id),
  skillId: integer('skill_id')
    .notNull()
    .references(() => skills.id),
});

export type JobSkillsSchema = InferSelectModel<typeof jobSkills>;
