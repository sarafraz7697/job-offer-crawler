import { locations } from './locations';
import { companies } from './companies';
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  pgEnum,
  serial,
  boolean,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { JobTypes } from '@libs/core/frameworks/data-services';

const jobTypeValues = Object.values(JobTypes) as [string, ...string[]];
export const jobType = pgEnum('type', jobTypeValues);

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  companyId: serial('company_id').references(() => companies.id),
  locationId: serial('location_id').references(() => locations.id),
  type: jobType(),
  salaryMin: integer('salary_min').default(0),
  salaryMax: integer('salary_max').default(0),
  currency: varchar('currency').default('USD'),
  remote: boolean('remote').default(false),
  experience: integer('experience').default(0),
  postedDate: timestamp('posted_date', { withTimezone: true }),
});

export type JobSchema = InferSelectModel<typeof jobs>;
