import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Api1Dto } from '@job-crawler/dtos';
import { catchError, firstValueFrom, retry } from 'rxjs';
import { IJobSourceFetcher } from '@libs/core/interface/data-sources/job-source.fetcher';
import { UnifiedJobDto } from '@libs/dtos';
import { JobMapperService } from '@job-crawler/services';

@Injectable()
export class Api1Fetcher implements IJobSourceFetcher {
  private readonly logger = new Logger(Api1Fetcher.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly jobMapperService: JobMapperService,
  ) {}

  async fetch(): Promise<UnifiedJobDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<Api1Dto>('https://assignment.devotel.io/api/provider1/jobs')
          .pipe(
            retry(3),
            catchError((error: AxiosError) => {
              this.logger.error(`API 1 fetch failed`, {
                message: error.message,
                code: error.code,
                response: error.response?.status,
                url: error.config?.url,
              });

              throw new InternalServerErrorException(
                'Failed to fetch jobs from API 1',
              );
            }),
          ),
      );

      return data?.jobs?.map((job) => this.jobMapperService.fromApi1(job));
    } catch (error) {
      this.logger.error(
        `Unhandled error fetching API 1: ${error?.message || error}`,
      );
      throw error;
    }
  }
}
