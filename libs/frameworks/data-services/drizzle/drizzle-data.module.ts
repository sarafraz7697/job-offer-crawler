import { Pool } from 'pg';
import * as schema from './schema';
import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { EnvConfigService } from '@libs/config/env';
import { DATA_SERVICE_TOKEN } from '@libs/core/interface/services';

/**
 * NestJS module that provides a data service using Drizzle ORM and PostgreSQL.
 *
 * @module DrizzleDataServiceModule
 * @description
 * Registers a provider for `DATA_SERVICE_TOKEN` using a factory that creates a PostgreSQL connection pool
 * with a connection string from `EnvConfigService`, and initializes Drizzle ORM with the specified schema.
 *
 * @provider DATA_SERVICE_TOKEN - The data service instance configured with Drizzle ORM and PostgreSQL.
 * @exports DATA_SERVICE_TOKEN - Makes the data service available for import in other modules.
 */
@Module({
  providers: [
    {
      provide: DATA_SERVICE_TOKEN,
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) => {
        const pool = new Pool({
          connectionString: configService.getPostgreSqlConnectionString(),
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DATA_SERVICE_TOKEN],
})
export class DrizzleDataServiceModule {}
