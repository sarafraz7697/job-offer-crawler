import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EnvConfigService } from '@libs/config/env/env.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JobCrawlerUseCase } from '@job-crawler/use-cases/job-crawler.use-case';

/**
 * Service responsible for scheduling and running the job crawler using a dynamic cron expression.
 *
 * - Registers a cron job on module initialization using a schedule from environment configuration.
 * - Executes the job crawler use case on each scheduled run.
 * - Uses NestJS's `SchedulerRegistry` to manage the cron job lifecycle.
 *
 * @remarks
 * This service is intended to be initialized automatically by NestJS's dependency injection system.
 */
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
