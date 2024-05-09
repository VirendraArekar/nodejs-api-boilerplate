// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import path from 'path';
// @ts-ignore
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(80),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),

    TEST_PORT: Joi.number().default(8000),
    TEST_JWT_SECRET: Joi.string().required().description('JWT secret key'),
    TEST_JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    TEST_JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    TEST_JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    TEST_JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    TEST_SMTP_HOST: Joi.string().description('server that will send the emails'),
    TEST_SMTP_PORT: Joi.number().description('port to connect to the email server'),
    TEST_SMTP_USERNAME: Joi.string().description('username for email server'),
    TEST_SMTP_PASSWORD: Joi.string().description('password for email server'),
    TEST_EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),

    DEV_PORT: Joi.number().default(3000),
    DEV_JWT_SECRET: Joi.string().required().description('JWT secret key'),
    DEV_JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    DEV_JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    DEV_JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    DEV_JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    DEV_SMTP_HOST: Joi.string().description('server that will send the emails'),
    DEV_SMTP_PORT: Joi.number().description('port to connect to the email server'),
    DEV_SMTP_USERNAME: Joi.string().description('username for email server'),
    DEV_SMTP_PASSWORD: Joi.string().description('password for email server'),
    DEV_EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const prodEnv = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
};

const devEnv = {
  env: envVars.NODE_ENV,
  port: envVars.DEV_PORT,
  jwt: {
    secret: envVars.DEV_JWT_SECRET,
    accessExpirationMinutes: envVars.DEV_JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.DEV_JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.DEV_JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.DEV_JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.DEV_SMTP_HOST,
      port: envVars.DEV_SMTP_PORT,
      auth: {
        user: envVars.DEV_SMTP_USERNAME,
        pass: envVars.DEV_SMTP_PASSWORD
      }
    },
    from: envVars.DEV_EMAIL_FROM
  }
};

const testEnv = {
  env: envVars.NODE_ENV,
  port: envVars.TEST_PORT,
  jwt: {
    secret: envVars.TEST_JWT_SECRET,
    accessExpirationMinutes: envVars.TEST_JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.TEST_JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.TEST_JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.TEST_JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.TEST_SMTP_HOST,
      port: envVars.TEST_SMTP_PORT,
      auth: {
        user: envVars.TEST_SMTP_USERNAME,
        pass: envVars.TEST_SMTP_PASSWORD
      }
    },
    from: envVars.TEST_EMAIL_FROM
  }
};

export default envVars.NODE_ENV === 'production' ? prodEnv : (envVars.NODE_ENV === 'development' ? devEnv : testEnv)