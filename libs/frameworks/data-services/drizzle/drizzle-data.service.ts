import { Pool } from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EnvConfigService } from '@libs/config/env/env.service';

@Injectable()
export class DrizzleDataService implements OnModuleInit {
  public db: ReturnType<typeof drizzle>;

  constructor(private readonly config: EnvConfigService) {}

  async onModuleInit() {
    const connectionString = this.config.getPostgreSqlConnectionString();

    const pool = new Pool({ connectionString });

    this.db = drizzle(pool, { schema });

    // test connection
    await pool.query('SELECT 1');
  }
}
