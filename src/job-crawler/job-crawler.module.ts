import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EnvConfigModule } from '@libs/config/env/env.module';
import { JobCrawlerUseCase } from './use-cases/job-crawler.use-case';
import { Api1Fetcher } from './sources/api1.fetcher';
import { Api2Fetcher } from './sources/api2.fetcher';
import {
  JobDeduplicatorService,
  JobMapperService,
  JobPersistService,
} from './services';
import { DrizzleDataServiceModule } from '@libs/frameworks/data-services/drizzle';
import { JobCronService } from './services/job-cron.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EnvConfigModule,
    DrizzleDataServiceModule,
    HttpModule.register({ timeout: 3000 }),
  ],
  providers: [
    JobCronService,
    JobCrawlerUseCase,
    Api1Fetcher,
    Api2Fetcher,
    JobMapperService,
    JobDeduplicatorService,
    JobPersistService,
  ],
})
export class JobCrawlerModule {}
