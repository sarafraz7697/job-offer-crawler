import { locations } from './locations';
import { companies } from './companies';
import { pgTable, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const jobs = pgTable('jobs', {
  id: varchar('id').primaryKey(),
  title: varchar('title').notNull(),
  companyId: varchar('company_id').references(() => companies.id),
  locationId: varchar('location_id').references(() => locations.id),
  type: varchar('type'), // Full-Time / Part-Time ? double check
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  currency: varchar('currency'),
  experience: integer('experience'),
  postedDate: timestamp('posted_date', { withTimezone: true }),
});
