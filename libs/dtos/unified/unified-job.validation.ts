import * as Joi from 'joi';
import { UnifiedJobDto } from './unified-job.dto';
import { JobTypes } from '@libs/core/frameworks/data-services';

/**
 * Joi validation schema for a unified job object.
 *
 * This schema validates the structure of a job posting, including fields such as:
 * - `id`: Optional string identifier for the job.
 * - `title`: Required job title.
 * - `company`: Required object containing company details:
 *   - `name`: Required company name.
 *   - `industry`: Optional industry name.
 *   - `website`: Optional company website.
 * - `skills`: Required array of skill strings.
 * - `location`: Required object specifying job location:
 *   - `city`: Required city name.
 *   - `state`: Required state name.
 * - `type`: Optional job type (e.g., full-time, part-time).
 * - `remote`: Optional boolean indicating if the job is remote (defaults to `false`).
 * - `salary`: Optional object specifying salary details:
 *   - `min`: Optional minimum salary (integer, >= 0).
 *   - `max`: Optional maximum salary (integer, >= min).
 *   - `currency`: Optional salary currency (defaults to `'USD'`).
 * - `currency`: Optional currency for the job.
 * - `experience`: Optional required years of experience (integer, >= 0).
 * - `postedDate`: Optional ISO date string for when the job was posted.
 */
export const unifiedJobSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().required(),
  company: Joi.object({
    name: Joi.string().required(),
    industry: Joi.string().optional(),
    website: Joi.string().optional(),
  }).required(),
  skills: Joi.array().items(Joi.string()).required(),
  location: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
  type: Joi.string().optional(),
  remote: Joi.boolean().optional().default(false),
  salary: Joi.object({
    min: Joi.number().integer().min(0).optional(),
    max: Joi.number().integer().min(Joi.ref('min')).optional(),
    currency: Joi.string().optional().default('USD'),
  }),
  currency: Joi.string().optional(),
  experience: Joi.number().integer().min(0).optional(),
  postedDate: Joi.date().iso().optional(),
});

export function validateUnifiedJob(data: unknown): UnifiedJobDto {
  const { error, value } = unifiedJobSchema.validate(data, {
    abortEarly: false,
  });
  if (error) {
    throw new Error(`Validation error: ${error.message}`);
  }
  return value as UnifiedJobDto;
}
