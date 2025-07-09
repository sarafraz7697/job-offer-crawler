import { InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
  industry: varchar('industry'),
  website: text(),
});

export type CompaniesSchema = InferSelectModel<typeof companies>;
