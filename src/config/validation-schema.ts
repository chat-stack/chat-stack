import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'local', 'sandbox', 'staging')
    .default('local'),
  PORT: Joi.number().default(5001),
  POSTGRES_HOST: Joi.string().default('chat-stack-postgres'),
  POSTGRES_DB: Joi.string().default('chat_stack_postgres'),
  POSTGRES_PASSWORD: Joi.string().required(),
  REDIS_HOST: Joi.string().default('chat-stack-redis'),
  REDIS_PORT: Joi.number().default(6379),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  OPENAI_API_KEY: Joi.string().required(),
  OPENSEARCH_URL: Joi.string().default('http://chat-stack-opensearch:9200'),
  FILE_STORAGE_TYPE: Joi.string().default('local'),
});
export default validationSchema;
