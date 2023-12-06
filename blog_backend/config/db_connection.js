import pgPromise from 'pg-promise'
import 'dotenv/config.js'

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

export const db = pgp(config);

