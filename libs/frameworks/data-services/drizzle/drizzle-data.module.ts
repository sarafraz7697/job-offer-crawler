import { Pool } from 'pg';
import * as schema from './schema';
import { Module, Logger } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { EnvConfigService } from '@libs/config/env';
import { DATA_SERVICE_TOKEN } from '@libs/core/interface/services';
import { sql } from 'drizzle-orm';

/**
 * NestJS module that provides a PostgreSQL database connection using Drizzle ORM.
 *
 * @module DrizzleDataServiceModule
 *
 * @remarks
 * - Registers a provider for `DATA_SERVICE_TOKEN` using a factory that:
 *   - Retrieves the PostgreSQL connection string from `EnvConfigService`.
 *   - Initializes a connection pool and Drizzle ORM instance.
 *   - Verifies the database connection on startup.
 *   - Logs success or exits the process on failure.
 *
 * @exports DATA_SERVICE_TOKEN
 */
@Module({
  providers: [
    {
      provide: DATA_SERVICE_TOKEN,
      inject: [EnvConfigService],
      useFactory: async (configService: EnvConfigService) => {
        const logger = new Logger('DrizzleDataService');
        const pool = new Pool({
          connectionString: configService.getPostgreSqlConnectionString(),
        });

        const db = drizzle(pool, { schema });

        try {
          await db.execute(sql`SELECT 1`);
          logger.log('Successfully connected to PostgreSQL.');
        } catch (e: any) {
          logger.error('Database connection failed', e.stack);
          process.exit(1);
        }

        return db;
      },
    },
  ],
  exports: [DATA_SERVICE_TOKEN],
})
export class DrizzleDataServiceModule {}
