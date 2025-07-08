import { Injectable } from '@nestjs/common';
import { UnifiedJobDto } from '@job-crawler/dtos';

@Injectable()
export class JobMapperService {
  fromApi1(raw: any): UnifiedJobDto {
    const [city, state] = raw.details.location
      .split(',')
      .map((s: string) => s.trim());
    const [minStr, maxStr] = raw.details.salaryRange.match(/\d+/g);

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
        remote: false,
      },
      salary: {
        min: parseInt(minStr, 10) * 1000,
        max: parseInt(maxStr, 10) * 1000,
        currency: 'USD',
      },
      skills: raw.skills,
      type: raw.details.type,
      postedDate: new Date(raw.postedDate),
    };
  }

  fromApi2(raw: any): UnifiedJobDto {
    return {
      id: raw.id,
      title: raw.position,
      company: {
        name: raw.employer.companyName,
        website: raw.employer.website,
      },
      location: {
        city: raw.location.city,
        state: raw.location.state,
        remote: raw.location.remote,
      },
      salary: {
        min: raw.compensation.min,
        max: raw.compensation.max,
        currency: raw.compensation.currency,
      },
      skills: raw.requirements.technologies,
      experience: raw.requirements.experience,
      postedDate: new Date(raw.datePosted),
    };
  }
}
