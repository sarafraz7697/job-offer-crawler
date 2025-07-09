import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JobMapperService } from '../services';
import { BaseJobFetcher } from '@libs/frameworks/data-sources';
import { UnifiedJobDto } from '@libs/dtos/unified/unified-job.dto';
import { Api2ResponseDto } from '@libs/dtos';

@Injectable()
export class Api2Crawler extends BaseJobFetcher<Api2ResponseDto> {
  protected url = 'https://assignment.devotel.io/api/provider2/jobs';

  constructor(
    http: HttpService,
    private readonly mapper: JobMapperService,
  ) {
    super(http);
    this.logger.log('started.');
  }

  toUnified(data: Api2ResponseDto): UnifiedJobDto[] {
    return Object.entries(data.data.jobsList).map(([id, job]) =>
      this.mapper.fromApi2(id, job),
    );
  }
}
