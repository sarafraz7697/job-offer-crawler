import { Pool } from 'pg';
import * as schema from './schema';
import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { EnvConfigService } from '@libs/config/env';
import { DATA_SERVICE_TOKEN } from '@libs/core/interface/services';

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
