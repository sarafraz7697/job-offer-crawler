import { InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const skills = pgTable('skills', {
  id: varchar('id').primaryKey(),
  name: varchar('name').notNull(),
});

export type SkillsSchema = InferSelectModel<typeof skills>;
