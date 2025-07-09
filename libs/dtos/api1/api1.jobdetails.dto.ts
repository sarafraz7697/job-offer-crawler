import { JobTypes } from '@libs/core/frameworks/data-services';

export interface Api1JobDetailsDto {
  location: string;
  type: JobTypes;
  salaryRange: string;
}
