import { Config } from 'drizzle-kit';
import { env } from './src/utils/env';

export const dbUrl = `mysql://${env.variables.DB_USER}:${env.variables.DB_PASS}@${env.variables.DB_HOST}:${env.variables.DB_PORT}/${env.variables.DB_NAME}`;

export default {
  schema: [
    "./src/infra/db/schemas/user/userSchema.ts",
],
  out: "./src/infra/db/drizzle",
  dialect: "mysql",
  breakpoints: true
} satisfies Config;