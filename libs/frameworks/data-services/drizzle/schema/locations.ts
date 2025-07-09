import { InferSelectModel } from 'drizzle-orm';
import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const locations = pgTable('locations', {
  id: varchar('id').primaryKey(),
  city: varchar('city').notNull(),
  state: varchar('state').notNull(),
  remote: boolean('remote').default(false),
});

export type LocationsSchema = InferSelectModel<typeof locations>;
