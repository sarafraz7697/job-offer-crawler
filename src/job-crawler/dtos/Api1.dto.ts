export class MetadataDto {
  requestId: string;
  timestamp: string;
}

export class JobDetailsDto {
  location: string;
  type: string;
  salaryRange: string;
}

export class CompanyDto {
  name: string;
  industry: string;
}

export class JobDto {
  jobId: string;
  title: string;
  details: JobDetailsDto;
  company: CompanyDto;
  skills: string[];
  postedDate: string;
}

export class Api1Dto {
  metadata: MetadataDto;
  jobs: JobDto[];
}
