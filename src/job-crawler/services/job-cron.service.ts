import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EnvConfigService } from '@libs/config/env/env.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JobCrawlerUseCase } from '@job-crawler/use-cases/job-crawler.use-case';

@Injectable()
export class JobCronService implements OnModuleInit {
  private readonly logger = new Logger(JobCronService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly crawler: JobCrawlerUseCase,
    private readonly env: EnvConfigService,
  ) {}

  onModuleInit() {
    const cronTime = this.env.getJobCrawlerScheduler();
    const job = new CronJob(cronTime, async () => {
      this.logger.log('Running dynamic scheduled job...');
      await this.crawler.execute();
    });

    this.schedulerRegistry.addCronJob('job-crawler', job);
    job.start();
  }
}
