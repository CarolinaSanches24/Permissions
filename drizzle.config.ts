import { Config } from 'drizzle-kit';
import { env } from './src/utils/env';

export const dbUrl = `mysql://${env.variables.DB_USER}:${env.variables.DB_PASS}@${env.variables.DB_HOST}:${env.variables.DB_PORT}/${env.variables.DB_NAME}`;

export default {
  schema: [
    "./src/infra/db/schemas/**/*.ts"  // busca todos os arquivos .ts dentro da pasta schemas e subpastas
  ],
  out: "./src/infra/db/drizzle",
  dialect: "mysql",
  breakpoints: true
} satisfies Config;