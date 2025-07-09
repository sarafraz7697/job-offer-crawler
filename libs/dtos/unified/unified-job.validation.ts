import * as Joi from 'joi';
import { UnifiedJobDto } from './unified-job.dto';
import { JobTypes } from '@libs/core/frameworks/data-services';

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
