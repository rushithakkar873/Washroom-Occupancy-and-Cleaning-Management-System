import { config } from "dotenv";

config();

const {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  SECRET_KEY,
} = process.env;

export default {
  port: PORT,
  db_host: DB_HOST,
  db_name: DB_NAME,
  db_port: DB_PORT,
  db_username: DB_USERNAME,
  db_password: DB_PASSWORD,
  secret_key: SECRET_KEY,
};
