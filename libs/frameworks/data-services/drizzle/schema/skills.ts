import { InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
});

export type SkillsSchema = InferSelectModel<typeof skills>;
