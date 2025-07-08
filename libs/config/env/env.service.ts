import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  getNodeEnv(): string | undefined {
    return this.configService.get<string>('NODE_ENV');
  }

  getVersion(): string {
    return this.configService.get<string>('NODE_ENV') || 'v1';
  }

  getPort(): number {
    return this.configService.get<number>('PORT') || 3000;
  }

  getPostgreSqlConnectionString(): string | undefined {
    return this.configService.get<string>('POSTGRESQL_CONNECTION_URI');
  }

  getJobCrawlerScheduler(): string {
    return (
      this.configService.get<string>('JOB_CRAWLER_SCHEDULE') || '0 */6 * * *'
    );
  }
}
