import * as Joi from 'joi';

export const validationSchema = Joi.object({
  TZ: Joi.string().default('Asia/Tehran'),
  PORT: Joi.number().port().required(),
  VERSION: Joi.string().default('v1'),
  JOB_CRAWLER_SCHEDULE: Joi.string()
    .required()
    .pattern(/^([\d*/,-]+\s){5}[\d*/,-]+$/),
  POSTGRESQL_CONNECTION_URI: Joi.string()
    .pattern(
      /^postgres(?:ql)?:\/\/[a-zA-Z0-9._~-]+(:[^@]+)?@[a-zA-Z0-9.-]+(:\d{1,5})?\/[a-zA-Z0-9_]+$/,
    )
    .required(),
});
