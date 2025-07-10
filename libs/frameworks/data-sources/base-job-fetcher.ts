import { AxiosError } from 'axios';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError, retry, timeout, throwError } from 'rxjs';
import { UnifiedJobDto } from '@libs/dtos/unified/unified-job.dto';
import { IJobSourceFetcher } from '@libs/core/interface/data-sources';

/**
 * Abstract base class for fetching job data from a remote source.
 *
 * @typeParam T - The type of the data returned by the job source.
 * @implements IJobSourceFetcher<T>
 *
 * @remarks
 * This class provides a template for fetching job data using an injected `HttpService`.
 * It handles HTTP requests with retry and timeout logic, and logs errors using a logger.
 * Subclasses must implement the `toUnified` method to convert the fetched data to a unified format,
 * and define the `url` property for the data source endpoint.
 *
 * @param http - The HTTP service used to perform requests.
 *
 * @property logger - Logger instance for logging errors and information.
 * @property url - The URL endpoint to fetch job data from (must be defined by subclasses).
 *
 * @method toUnified - Converts the fetched data to an array of `UnifiedJobDto`.
 * @method fetch - Fetches job data from the remote source, with retry and timeout logic.
 */
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
