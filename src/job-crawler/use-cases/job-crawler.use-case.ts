import { UnifiedJobDto } from '@libs/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { JobPersistService } from '@job-crawler/services';
import { ICrawlerSource } from '@libs/core/interface/data-sources';
import { CRAWLER_SOURCES } from '@libs/core/frameworks/data-sources';

@Injectable()
export class JobCrawlerUseCase {
  // constructor(
  //   @Inject(CRAWLER_SOURCES)
  //   private readonly sources: ICrawlerSource[],
  //   private readonly persister: JobPersistService,
  // ) {}

  async execute(): Promise<void> {
    // const jobs: UnifiedJobDto[] = [];
    // for (const source of this.sources) {
    //   const raw = await source.fetch();
    //   jobs.push(...source.toUnified(raw));
    // }
    // for (const job of jobs) {
    //   await this.persister.save(job);
    // }
  }
}
