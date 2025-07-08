import { jobs } from './jobs';
import { skills } from './skills';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const jobSkills = pgTable('job_skills', {
  jobId: varchar('job_id').references(() => jobs.id),
  skillName: varchar('skill_name').references(() => skills.name),
});
