import { Api2JobDto } from './api2.job.dto';

export type Api2JobsListDto = Record<string, Api2JobDto>;

export interface Api2DataDto {
  jobsList: Api2JobsListDto;
}
