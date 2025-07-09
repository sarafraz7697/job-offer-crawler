import {
  DATA_SERVICE_TOKEN,
  IDataservice,
} from '@libs/core/interface/services';
import { sql } from 'drizzle-orm';
import { Inject } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

export class DrizzleHealth {
  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private dataService: IDataservice,
  ) {}

  async checkDb(): Promise<HealthIndicatorResult> {
    try {
      await this.dataService.execute(sql`SELECT 1`);

      return {
        db: {
          status: 'up',
        },
      };
    } catch (error) {
      return {
        db: {
          status: 'down',
          message: error.message || 'Unknown error',
        },
      };
    }
  }
}
