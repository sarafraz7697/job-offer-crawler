import * as sources from './sources';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetJobOffersUseCase, JobCrawlerUseCase } from './use-cases';
import { ScheduleModule } from '@nestjs/schedule';
import { JobCronService } from './services/job-cron.service';
import { EnvConfigModule } from '@libs/config/env/env.module';
import { JobMapperService, JobPersistService } from './services';
import { CRAWLER_SOURCES } from '@libs/core/frameworks/data-sources';
import {
  DrizzleDataServiceModule,
  DrizzleRepositoriesModule,
} from '@libs/frameworks/data-services/drizzle';
import { ICrawlerSource } from '@libs/core/interface/data-sources';

const CRAWLER_CLASSES = Object.values(sources);
/**
 * The `JobCrawlerModule` is a NestJS module responsible for orchestrating the job crawling functionality.
 *
 * @remarks
 * This module imports essential dependencies such as HTTP communication, environment configuration,
 * scheduling, and data services. It provides and exports use cases and services related to job crawling,
 * mapping, and persistence. The module also dynamically injects multiple crawler sources using a factory provider.
 *
 * @module
 * @imports
 * - HttpModule: Enables HTTP requests for crawling job offers.
 * - EnvConfigModule: Provides environment configuration.
 * - ScheduleModule: Enables scheduled tasks (cron jobs).
 * - DrizzleDataServiceModule: Handles data service integration.
 * - DrizzleRepositoriesModule: Provides repository access for data persistence.
 *
 * @exports
 * - GetJobOffersUseCase: Use case for retrieving job offers.
 *
 * @providers
 * - JobCronService: Handles scheduled crawling tasks.
 * - JobCrawlerUseCase: Main use case for crawling jobs.
 * - GetJobOffersUseCase: Use case for fetching job offers.
 * - JobMapperService: Maps raw job data to domain models.
 * - JobPersistService: Persists job data to storage.
 * - ...CRAWLER_CLASSES: Array of crawler source classes.
 * - CRAWLER_SOURCES: Token for injecting all crawler sources as an array.
 */
@Module({
  imports: [
    HttpModule,
    EnvConfigModule,
    ScheduleModule.forRoot(),
    DrizzleDataServiceModule,
    DrizzleRepositoriesModule,
  ],
  exports: [GetJobOffersUseCase],
  providers: [
    JobCronService,
    JobCrawlerUseCase,
    GetJobOffersUseCase,
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
