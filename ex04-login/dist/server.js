"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core & External modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// -------------------------------------------------------------------
const testdb_1 = require("./database/testdb");
const ServerCheck_1 = __importDefault(require("./controllers/ServerCheck"));
const env_1 = require("./config/env");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
// -------------------------------------------------------------------
const app = (0, express_1.default)();
const stream = {
    write: (message) => console.log(message.trim()),
};
if (env_1.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev", { stream }));
}
else {
    app.use((0, morgan_1.default)("combined", { stream }));
}
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// -------------------------------------------------------------------
(0, testdb_1.testDBConnection)();
// -------------------------------------------------------------------
// Routes
app.get("/", ServerCheck_1.default);
app.use("/auth", auth_route_1.default);
// -------------------------------------------------------------------
// Start server
app.listen(Number(env_1.env.PORT)).on("listening", () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${env_1.env.PORT} (${env_1.env.NODE_ENV || "development"} mode)`);
}).on("error", (err) => {
    console.error("[Server] Failed to start:", err);
    process.exit(1);
});
