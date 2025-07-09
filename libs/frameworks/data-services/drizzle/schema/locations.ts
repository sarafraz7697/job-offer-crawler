import { InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  city: varchar('city').notNull(),
  state: varchar('state').notNull(),
});

export type LocationsSchema = InferSelectModel<typeof locations>;
