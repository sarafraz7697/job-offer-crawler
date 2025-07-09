import { UnifiedJobDto } from '@libs/dtos';

export interface IJobSourceFetcher {
  fetch(): Promise<UnifiedJobDto[]>;
}
