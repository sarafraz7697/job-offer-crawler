import { UnifiedJobDto } from '@libs/dtos';
import { validateUnifiedJob } from '@libs/dtos/unified';
import { JobPersistService } from '@job-crawler/services';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICrawlerSource } from '@libs/core/interface/data-sources';
import { CRAWLER_SOURCES } from '@libs/core/frameworks/data-sources';

@Injectable()
export class JobCrawlerUseCase {
  private readonly logger = new Logger(JobCrawlerUseCase.name);

  constructor(
    @Inject(CRAWLER_SOURCES)
    private readonly sources: ICrawlerSource[],
    private readonly persister: JobPersistService,
  ) {}

  async execute(): Promise<void> {
    const jobs: UnifiedJobDto[] = [];

    for (const source of this.sources) {
      const raw = await source.fetch();
      jobs.push(...source.toUnified(raw));
    }

    for (const job of jobs) {
      try {
        const validJob = validateUnifiedJob(job);
        await this.persister.process(validJob);
      } catch (error) {
        this.logger.warn(`Invalid job data skipped: ${error.message}`);
      }
    }
  }
}
