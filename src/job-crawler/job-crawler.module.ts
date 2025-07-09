import * as sources from './sources';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { JobCronService } from './services/job-cron.service';
import { EnvConfigModule } from '@libs/config/env/env.module';
import { JobMapperService, JobPersistService } from './services';
import { JobCrawlerUseCase } from './use-cases/job-crawler.use-case';
import { CRAWLER_SOURCES } from '@libs/core/frameworks/data-sources';
import { DrizzleDataServiceModule } from '@libs/frameworks/data-services/drizzle';
import { ICrawlerSource } from '@libs/core/interface/data-sources';

const CRAWLER_CLASSES = Object.values(sources);
@Module({
  imports: [
    ScheduleModule.forRoot(),
    EnvConfigModule,
    DrizzleDataServiceModule,
    HttpModule,
  ],
  providers: [
    JobCronService,
    JobCrawlerUseCase,
    JobMapperService,
    JobPersistService,
    ...CRAWLER_CLASSES,
    {
      provide: CRAWLER_SOURCES,
      useFactory: (...crawlers: ICrawlerSource[]) => crawlers,
      inject: CRAWLER_CLASSES,
    },
  ],
})
export class JobCrawlerModule {}
