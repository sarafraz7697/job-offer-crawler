import { Injectable } from '@nestjs/common';
import {
  JobDeduplicatorService,
  JobPersistService,
} from '@job-crawler/services';
import { Api1Fetcher, Api2Fetcher } from '@job-crawler/sources';

@Injectable()
export class JobCrawlerUseCase {
  constructor(
    private readonly api1Fetcher: Api1Fetcher,
    private readonly api2Fetcher: Api2Fetcher,
    private readonly deduplicator: JobDeduplicatorService,
    private readonly persister: JobPersistService,
  ) {}

  async execute(): Promise<void> {
    const jobsFromApi1 = await this.api1Fetcher.fetch();
    const jobsFromApi2 = await this.api2Fetcher.fetch();
    console.log('jobsFromApi1', jobsFromApi1);
    console.log('jobsFromApi2', jobsFromApi2);

    const unifiedJobs = [...jobsFromApi1, ...jobsFromApi2];
    for (const job of unifiedJobs) {
      // if (!this.deduplicator.isDuplicate(job.id)) {
      //   await this.persister.save(job);
      // }
    }
  }
}
