import { z } from "zod";

// === Interfaces ===

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    created_at: Date | string;
    updated_at: Date | string;
}

export interface JWTUserPayload {
    id: number;
    username: string;
    email: string;
    role: "admin" | "user";
}

// === Zod Schemas ===

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
}).strict();

export const userRegisterSchema = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
}).strict();

export const updateUserSchema = z.object({
    username: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(255).optional(),
    updatedAt: z.union([z.string(), z.date()]),
}).strict();

// === Inferred Types from Zod ===

export type UserLoginDTO = z.infer<typeof userLoginSchema>;
export type UserRegisterDTO = z.infer<typeof userRegisterSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
