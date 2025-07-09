export class LocationDto {
  city: string;
  state: string;
  remote: boolean;
}

export class CompensationDto {
  min: number;
  max: number;
  currency: 'USD' | 'EUR' | 'IRR';
}

export class EmployerDto {
  companyName: string;
  website: string;
}

export class RequirementsDto {
  experience: number;
  technologies: string[];
}

export class JobEntryDto {
  position: string;
  location: LocationDto;
  compensation: CompensationDto;
  employer: EmployerDto;
  requirements: RequirementsDto;
  datePosted: string;
}

export class JobsListDto {
  jobs: JobEntryDto[];
}

export class DataDto {
  jobsList: JobsListDto;
}

export class Api2Dto {
  status: string;
  data: DataDto;
}
