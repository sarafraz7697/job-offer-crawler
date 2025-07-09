import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './libs/frameworks/data-services/drizzle/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRESQL_CONNECTION_URI!,
  },
});
