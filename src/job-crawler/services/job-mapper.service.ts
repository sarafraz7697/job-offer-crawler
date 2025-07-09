import { Injectable } from '@nestjs/common';
import { UnifiedJobDto } from '@libs/dtos/unified/unified-job.dto';
import { Api1JobDto, Api2JobDto } from '@libs/dtos';
import { JobTypes } from '@libs/core/frameworks/data-services';

@Injectable()
export class JobMapperService {
  fromApi1(raw: Api1JobDto): UnifiedJobDto {
    const [city, state] = raw.details.location
      .split(',')
      .map((s: string) => s.trim());
    const [minStr, maxStr] = raw.details.salaryRange.match(/\d+/g) ?? [
      '0',
      '0',
    ];

    let jobType: JobTypes =
      JobTypes[raw.details.type.replace('-', '_').toUpperCase()] ??
      JobTypes.PART_TIME;

    return {
      id: raw.jobId,
      title: raw.title,
      company: {
        name: raw.company.name,
        industry: raw.company.industry,
      },
      location: {
        city,
        state,
      },
      remote: false,
      salary: {
        min: parseInt(minStr, 10) * 1000,
        max: parseInt(maxStr, 10) * 1000,
        currency: 'USD',
      },
      skills: raw.skills,
      type: jobType,
      postedDate: new Date(raw.postedDate),
    };
  }

  fromApi2(id: string, raw: Api2JobDto): UnifiedJobDto {
    return {
      id: id,
      title: raw.position,
      company: {
        name: raw.employer.companyName,
        website: raw.employer.website,
      },
      location: {
        city: raw.location.city,
        state: raw.location.state,
      },
      salary: {
        min: raw.compensation.min,
        max: raw.compensation.max,
        currency: raw.compensation.currency,
      },
      type: JobTypes.PART_TIME,
      remote: raw.location.remote,
      skills: raw.requirements.technologies,
      experience: raw.requirements.experience,
      postedDate: new Date(raw.datePosted),
    };
  }
}
