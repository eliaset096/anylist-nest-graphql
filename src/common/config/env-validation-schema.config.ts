import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  STATE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
