import { UnifiedJobDto } from '@libs/dtos';
import { validateUnifiedJob } from '@libs/dtos/unified';
import { JobPersistService } from '@job-crawler/services';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICrawlerSource } from '@libs/core/interface/data-sources';
import { CRAWLER_SOURCES } from '@libs/core/frameworks/data-sources';

/**
 * Use case for crawling job sources, validating, and persisting job data.
 *
 * This class iterates over all injected job crawler sources, fetches raw job data,
 * transforms it into a unified format, validates each job, and persists valid jobs.
 * Invalid jobs are skipped and logged as warnings.
 *
 * @class
 * @injectable
 */
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
