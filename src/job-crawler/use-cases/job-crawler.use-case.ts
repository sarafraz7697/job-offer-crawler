import { Injectable } from '@nestjs/common';
import { Api1Fetcher } from '@job-crawler/sources/api1.fetcher';
import { Api2Fetcher } from '@job-crawler/sources/api2.fetcher';
import {
  JobDeduplicatorService,
  JobMapperService,
  JobPersistService,
} from '@job-crawler/services';

@Injectable()
export class JobCrawlerUseCase {
  constructor(
    private readonly api1Fetcher: Api1Fetcher,
    private readonly api2Fetcher: Api2Fetcher,
    private readonly mapper: JobMapperService,
    private readonly deduplicator: JobDeduplicatorService,
    private readonly persister: JobPersistService,
  ) {}

  async execute(): Promise<void> {
    const jobsFromApi1 = await this.api1Fetcher.fetch();
    const jobsFromApi2 = Object.entries(await this.api2Fetcher.fetch()).map(
      ([id, job]) => ({ ...job }),
    );

    const unifiedJobs = [
      ...jobsFromApi1.map((raw) => this.mapper.fromApi1(raw)),
      ...jobsFromApi2.map((raw) => this.mapper.fromApi2(raw)),
    ];

    for (const job of unifiedJobs) {
      if (!this.deduplicator.isDuplicate(job.id)) {
        await this.persister.save(job);
      }
    }
  }
}
