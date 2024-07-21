import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";
import { User } from "./entities/User";
import { ActivityLog } from "./entities/ActivityLog";
import { Washroom } from "./entities/Washroom";

const { db_host, db_name, db_port, db_username, db_password } = config;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: db_host,
  port: Number(db_port),
  username: db_username,
  password: db_password,
  database: db_name,
  synchronize: true,
  logging: false,
  entities: [User, ActivityLog, Washroom],
});
