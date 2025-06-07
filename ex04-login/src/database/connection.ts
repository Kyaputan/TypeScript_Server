import mysql, { PoolOptions , Pool  } from "mysql2/promise";
import { env } from "../config/env";


const config: PoolOptions = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool: Pool = mysql.createPool(config);

export default pool;
