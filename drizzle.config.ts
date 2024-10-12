/* eslint-disable no-undef */
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT,
  TABLE_PREFIX,
} = process.env;

if (
  !DATABASE_HOST ||
  !DATABASE_USER ||
  !DATABASE_PASSWORD ||
  !DATABASE_NAME ||
  !DATABASE_PORT ||
  !TABLE_PREFIX
) {
  throw new Error('Missing required database configuration in environment variables');
}

export default {
  schema: './schema/*',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    port: Number(process.env.DATABASE_PORT),
  },
  strict: true,
  tablesFilter: [`${TABLE_PREFIX}_*`],
} satisfies Config;
