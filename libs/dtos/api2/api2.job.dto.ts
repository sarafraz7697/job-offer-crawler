import { Api2EmployerDto } from './api2.employer.dto';
import { Api2LocationDto } from './api2.location.dto';
import { Api2RequirementsDto } from './api2.requirement.dto';
import { Api2CompensationDto } from './api2.compensation.dto';

export interface Api2JobDto {
  position: string;
  location: Api2LocationDto;
  compensation: Api2CompensationDto;
  employer: Api2EmployerDto;
  requirements: Api2RequirementsDto;
  datePosted: string;
}
