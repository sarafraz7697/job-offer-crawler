import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Api1ResponseDto } from '@libs/dtos';
import { JobMapperService } from '../services';
import { BaseJobFetcher } from '@libs/frameworks/data-sources';
import { UnifiedJobDto } from '@libs/dtos/unified/unified-job.dto';

@Injectable()
export class Api1Crawler extends BaseJobFetcher<Api1ResponseDto> {
  protected url = 'https://assignment.devotel.io/api/provider1/jobs';

  constructor(
    http: HttpService,
    private readonly mapper: JobMapperService,
  ) {
    super(http);
    this.logger.log('started.');
  }

  toUnified(data: Api1ResponseDto): UnifiedJobDto[] {
    return data.jobs.map((job) => this.mapper.fromApi1(job));
  }
}
