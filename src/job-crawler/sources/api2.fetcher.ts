import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Api2Dto } from '@job-crawler/dtos';
import { catchError, firstValueFrom, retry } from 'rxjs';
import { IJobSourceFetcher } from '@libs/core/interface/data-sources/job-source.fetcher';
import { UnifiedJobDto } from '@libs/dtos';
import { JobMapperService } from '@job-crawler/services';

@Injectable()
export class Api2Fetcher implements IJobSourceFetcher {
  private readonly logger = new Logger(Api2Fetcher.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly jobMapperService: JobMapperService,
  ) {}

  async fetch(): Promise<UnifiedJobDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<Api2Dto>('https://assignment.devotel.io/api/provider2/jobs')
          .pipe(
            retry(3),
            catchError((error: AxiosError) => {
              this.logger.error(`API 2 fetch failed`, {
                message: error.message,
                code: error.code,
                response: error.response?.status,
                url: error.config?.url,
              });

              throw new InternalServerErrorException(
                'Failed to fetch jobs from API 2',
              );
            }),
          ),
      );

      return Object.values(data?.data.jobsList ?? {}).map((job) =>
        this.jobMapperService.fromApi2(job),
      );
    } catch (error) {
      this.logger.error(
        `Unhandled error fetching API 2: ${error?.message || error}`,
      );
      throw error;
    }
  }
}
