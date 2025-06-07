"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
exports.env = {
    PORT: process.env.PORT || "error",
    JWT_SECRET: process.env.JWT_SECRET || "error",
    DATABASE_URL: process.env.DATABASE_URL || "error",
    DB_HOST: process.env.DB_HOST || "error",
    DB_USER: process.env.DB_USER || "error",
    DB_PASSWORD: process.env.DB_PASSWORD || "error",
    DB_NAME: process.env.DB_NAME || "error",
    NODE_ENV: process.env.NODE_ENV || "development",
    BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
