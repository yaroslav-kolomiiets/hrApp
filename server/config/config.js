import Joi from "joi";
import dotEnv from "dotenv";

dotEnv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  PUBLIC_DIR: Joi.string()
    .required()
    .description("Folder with frontend"),

  NODE_ENV: Joi.string()
    .allow(["development", "test", "production"])
    .required()
    .default("development"),

  PORT: Joi.number()
    .required()
    .default(3000),

  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),

  JWT_SECRET: Joi.string()
    .required()
    .description("JWT Secret required to sign"),

  MONGO_HOST: Joi.string()
    .required()
    .description("Mongo DB host url"),

  MONGO_DB: Joi.string()
    .required()
    .description("Mongo DB name"),

  MONGO_PORT: Joi.number().default(27017)
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  publicDir: envVars.PUBLIC_DIR,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    db: envVars.MONGO_DB,
    port: envVars.MONGO_PORT
  }
};

export default config;
