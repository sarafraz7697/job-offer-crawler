import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const locations = pgTable('locations', {
  id: varchar('id').primaryKey(),
  city: varchar('city'),
  state: varchar('state'),
  remote: boolean('remote').default(false),
});
