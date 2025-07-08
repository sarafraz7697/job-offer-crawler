import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const skills = pgTable('skills', {
  name: varchar('name').primaryKey(),
});
