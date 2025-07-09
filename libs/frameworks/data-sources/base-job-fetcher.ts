import { AxiosError } from 'axios';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError, retry, timeout, throwError } from 'rxjs';
import { UnifiedJobDto } from '@libs/dtos/unified/unified-job.dto';
import { IJobSourceFetcher } from '@libs/core/interface/data-sources';

export abstract class BaseJobFetcher<T> implements IJobSourceFetcher<T> {
  constructor(protected readonly http: HttpService) {
    this.logger = new Logger(this.constructor.name);
  }
  protected readonly logger = new Logger(BaseJobFetcher.name);
  protected abstract url: string;

  abstract toUnified(data: T): UnifiedJobDto[];

  async fetch(): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.http.get<T>(this.url).pipe(
          timeout(5000),
          retry(3),
          catchError((error: AxiosError) => {
            this.logger.error(`fetch failed`, {
              message: error.message,
              code: error.code,
              response: error.response?.status,
              url: error.config?.url,
            });

            return [];
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch data after retries:`, error);

      return {} as T;
    }
  }
}
