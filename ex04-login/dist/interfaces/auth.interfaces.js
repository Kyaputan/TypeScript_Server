"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userRegisterSchema = exports.userLoginSchema = void 0;
const zod_1 = require("zod");
// === Zod Schemas ===
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(255),
}).strict();
exports.userRegisterSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(255),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(255),
}).strict();
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(255).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).max(255).optional(),
    updatedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]),
}).strict();
