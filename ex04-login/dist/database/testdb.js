"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDBConnection = void 0;
const connection_1 = __importDefault(require("./connection"));
const env_1 = require("../config/env");
const testDBConnection = async () => {
    try {
        const connection = await connection_1.default.getConnection();
        await connection.ping();
        console.log(`[Database] Connected to MySQL: ${env_1.env.DB_HOST} ✅`);
        connection.release();
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};
exports.testDBConnection = testDBConnection;
