import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvConfigModule } from '@libs/config/env';
import { JobCrawlerModule } from './job-crawler/job-crawler.module';

@Module({
  imports: [EnvConfigModule, JobCrawlerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
