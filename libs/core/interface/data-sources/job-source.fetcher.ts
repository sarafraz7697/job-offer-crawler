import { UnifiedJobDto } from '@libs/dtos';

/**
 * Interface for fetching job data from a source and transforming it into a unified format.
 *
 * @typeParam T - The type of the raw data returned by the fetch operation.
 */
export interface IJobSourceFetcher<T> {
  fetch(): Promise<T>;
  toUnified(data: T): UnifiedJobDto[];
}
