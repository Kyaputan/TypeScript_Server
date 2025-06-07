// Core & External modules
import express, { Application} from "express";
import cors from "cors";
import morgan, { StreamOptions } from "morgan";

// -------------------------------------------------------------------
import { testDBConnection } from "./database/testdb";
import ServerCheck from "./controllers/ServerCheck";
import { env } from "./config/env";
import authRoutes from "./routes/auth.route";
// -------------------------------------------------------------------

const app: Application = express();
const stream: StreamOptions = {
  write: (message) => console.log(message.trim()),
};

if (env.NODE_ENV !== "production") {
  app.use(morgan("dev", { stream }));
} else {
  app.use(morgan("combined", { stream }));
}
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({ origin: true, credentials: true }));
// -------------------------------------------------------------------
testDBConnection();
// -------------------------------------------------------------------
// Routes
app.get("/", ServerCheck); 
app.use("/auth", authRoutes);
// -------------------------------------------------------------------
// Start server
app.listen(Number(env.PORT)).on("listening", () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${env.PORT} (${env.NODE_ENV || "development"} mode)`);
}).on("error", (err: NodeJS.ErrnoException) => {
    console.error("[Server] Failed to start:", err);
    process.exit(1);
});
