import { Test, TestingModule } from '@nestjs/testing';
import { JobCrawlerUseCase } from './job-crawler.use-case';
import { JobCronService } from '@job-crawler/services/job-cron.service';
import { GetJobOffersUseCase } from './get-job-offers.use-case';
import { JobMapperService, JobPersistService } from '@job-crawler/services';
import { CRAWLER_SOURCES } from '@libs/core/frameworks/data-sources';
import * as sources from '../sources';
import { ICrawlerSource } from '@libs/core/interface/data-sources';
import { HttpModule } from '@nestjs/axios';
import { EnvConfigModule } from '@libs/config/env';
import { ScheduleModule } from '@nestjs/schedule';
import {
  DrizzleDataServiceModule,
  DrizzleRepositoriesModule,
} from '@libs/frameworks/data-services/drizzle';
const CRAWLER_CLASSES = Object.values(sources);

describe('JobCrawlerUseCase', () => {
  let service: JobCrawlerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        EnvConfigModule,
        ScheduleModule.forRoot(),
        DrizzleDataServiceModule,
        DrizzleRepositoriesModule,
      ],
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
    }).compile();

    service = module.get<JobCrawlerUseCase>(JobCrawlerUseCase);
  });

  it('should be defined', () => {
    expect(service.execute).toBeDefined();
  });

  it('should be return true', () => {
    expect(service.execute()).toBeTruthy();
  });
});
