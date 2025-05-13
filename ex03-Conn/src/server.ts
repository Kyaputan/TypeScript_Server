import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const PORT: number = 5000;
const app: Application = express();
app.use(express.json());
app.use(morgan("dev"));

const DB_HOST: string = process.env.DB_HOST || "localhost";
const DB_USER: string = process.env.DB_USER || "root";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
const DB_NAME: string = process.env.DB_NAME || "Test";

console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

const connection: mysql.Connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
connection.connect();

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.get("/item", (req: Request, res: Response) => {
  const query: string = "SELECT * FROM products";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("❌ Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.listen(PORT).on("listening", () => {
    console.info(
      `[Server] Successfully started 🚀 on http://localhost:${PORT} (${process.env.NODE_ENV || "development"} mode)`
    );
}).on("error", (err) => {
    console.error("[Server] Failed to start:", err);
    process.exit(1);
});
