import { Api1CompanyDto } from './api1.company.dto';
import { Api1JobDetailsDto } from './api1.jobdetails.dto';

export interface Api1JobDto {
  jobId: string;
  title: string;
  details: Api1JobDetailsDto;
  company: Api1CompanyDto;
  skills: string[];
  postedDate: string;
}
