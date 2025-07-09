import { UnifiedJobDto } from '@libs/dtos';

export interface IJobSourceFetcher<T> {
  fetch(): Promise<T>;
  toUnified(data: T): UnifiedJobDto[];
}
