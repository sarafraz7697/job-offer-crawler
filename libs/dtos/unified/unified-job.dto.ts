import { JobTypes } from '@libs/core/frameworks/data-services';

export interface UnifiedJobDto {
  id: string;
  title: string;
  company: {
    name: string;
    industry?: string;
    website?: string;
  };
  location: {
    city: string;
    state: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  remote?: boolean;
  experience?: number;
  skills: string[];
  type?: JobTypes;
  postedDate: Date;
}
