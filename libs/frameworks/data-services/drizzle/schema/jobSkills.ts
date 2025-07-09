import { InferSelectModel } from 'drizzle-orm';
import { jobs } from './jobs';
import { skills } from './skills';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const jobSkills = pgTable('job_skills', {
  jobId: varchar('job_id').references(() => jobs.id),
  skillId: varchar('skill_id').references(() => skills.id),
});

export type JobSkillsSchema = InferSelectModel<typeof jobSkills>;
