import * as dotenv from 'dotenv';
import * as process from 'process';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { models } from '../../db/models';
dotenv.config();

const {
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  POSTGRES_DB_USER_NAME,
  POSTGRES_DB_PASSWORD,
  POSTGRES_DB,
} = process.env;

const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: POSTGRES_DB_HOST,
  port: parseInt(POSTGRES_DB_PORT),
  username: POSTGRES_DB_USER_NAME,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB,
  autoLoadModels: true,
  synchronize: true,
  models,
  // sync: { force: true }, // Don't ever enable this in production!!!
};

export default config;
