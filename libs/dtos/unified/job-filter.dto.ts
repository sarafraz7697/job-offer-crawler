import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

/**
 * Data Transfer Object for filtering job listings.
 *
 * @property {string} [title] - Optional job title to filter by.
 * @property {number} [locationId] - Optional location ID to filter by.
 * @property {number} [salaryMin] - Optional minimum salary to filter by.
 * @property {number} [salaryMax] - Optional maximum salary to filter by.
 * @property {number} page - Page number for pagination (default: 1).
 * @property {number} limit - Number of items per page for pagination (default: 10).
 */
export class JobFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  locationId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  salaryMin?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  salaryMax?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page: number = 1;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit: number = 10;
}
