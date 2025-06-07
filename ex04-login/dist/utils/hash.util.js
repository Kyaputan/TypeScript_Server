"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../config/env");
const SALT_ROUNDS = env_1.env.BCRYPT_SALT_ROUNDS;
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
