import { JobTypes } from '@libs/core/frameworks/data-services';

/**
 * Data Transfer Object representing a unified job posting.
 *
 * @property id - Unique identifier for the job.
 * @property title - Title or name of the job position.
 * @property company - Information about the company offering the job.
 * @property company.name - Name of the company.
 * @property company.industry - (Optional) Industry sector of the company.
 * @property company.website - (Optional) Website URL of the company.
 * @property location - Location details for the job.
 * @property location.city - City where the job is located.
 * @property location.state - State or region where the job is located.
 * @property salary - Salary range and currency for the job.
 * @property salary.min - Minimum salary offered.
 * @property salary.max - Maximum salary offered.
 * @property salary.currency - Currency of the salary (e.g., USD, EUR).
 * @property remote - (Optional) Indicates if the job is remote.
 * @property experience - (Optional) Required years of experience.
 * @property skills - List of required or preferred skills for the job.
 * @property type - (Optional) Type of job (e.g., full-time, part-time).
 * @property postedDate - Date when the job was posted.
 */
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
