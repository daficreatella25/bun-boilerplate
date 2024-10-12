import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT
} = process.env;

if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
  throw new Error('Missing required database configuration in environment variables');
}

export default {
  schema: './schema/*', // This will include all files in the schema directory
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT ? parseInt(DATABASE_PORT) : 3306,
  },
} satisfies Config;