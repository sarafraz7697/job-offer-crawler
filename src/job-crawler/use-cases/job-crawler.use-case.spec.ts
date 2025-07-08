import { Test, TestingModule } from '@nestjs/testing';
import { JobCrawlerUseCase } from './job-crawler.use-case';

describe('JobCrawlerUseCase', () => {
  let service: JobCrawlerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobCrawlerUseCase],
    }).compile();

    service = module.get<JobCrawlerUseCase>(JobCrawlerUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
