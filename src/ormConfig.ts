import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './apis/users/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DEV_DB_HOST,
  port: 3306,
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  entities: [User],
  synchronize: true,
  logging: true,
};
