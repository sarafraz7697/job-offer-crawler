import { locations } from './locations';
import { companies } from './companies';
import { JobTypes } from '@libs/core/frameworks/data-services/drizzle/job';
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

const jobTypeValues = Object.values(JobTypes) as [string, ...string[]];
export const jobType = pgEnum('type', jobTypeValues);

export const jobs = pgTable('jobs', {
  id: varchar('id').primaryKey(),
  title: varchar('title').notNull(),
  companyId: varchar('company_id').references(() => companies.id),
  locationId: varchar('location_id').references(() => locations.id),
  type: jobType(),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  currency: varchar('currency'),
  experience: integer('experience'),
  postedDate: timestamp('posted_date', { withTimezone: true }),
});

export type JobSchema = InferSelectModel<typeof jobs>;
