"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const auth_interfaces_1 = require("../interfaces/auth.interfaces");
const hash_util_1 = require("../utils/hash.util");
const auth_middleware_1 = require("../utils/auth.middleware");
const register = async (req, res) => {
    const userData = auth_interfaces_1.userRegisterSchema.parse(req.body);
    const { username, email, password } = userData;
    try {
        const hashedPassword = await (0, hash_util_1.hashPassword)(password);
        const query = `INSERT INTO users (username, email, password, role, created_at, updated_at) VALUES (?, ?, ?, 'user', NOW(), NOW())`;
        const [result] = await connection_1.default.execute(query, [username, email, hashedPassword,]);
        const insertId = result.insertId;
        const [rows] = await connection_1.default.query("SELECT * FROM users WHERE id = ?", [insertId]);
        const user = rows[0];
        res.status(201).json({
            message: "User registered successfully",
            user: user,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "Failed to register user",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    const userData = auth_interfaces_1.userLoginSchema.parse(req.body);
    const { email, password } = userData;
    try {
        const [rows] = await connection_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await (0, hash_util_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = (0, auth_middleware_1.generateToken)({ id: user.id, username: user.username, email: user.email, role: user.role });
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token: token,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            message: "Failed to log in user",
        });
    }
};
exports.login = login;
