import pool from "./connection";
import { env } from "../config/env";

export const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    console.log(`[Database] Connected to MySQL: ${env.DB_HOST} ✅`);
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}
