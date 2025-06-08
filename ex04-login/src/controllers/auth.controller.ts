import { Request, Response } from "express";
import { UserLoginDTO, UserRegisterDTO, User } from "../interfaces/auth.interfaces";
import pool from "../database/connection";
import { userRegisterSchema , userLoginSchema } from "../interfaces/auth.interfaces";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { hashPassword , comparePassword } from "../utils/hash.util";
import { generateToken } from "../utils/auth.middleware";


export const register = async (req: Request<{}, {}, UserRegisterDTO>,res: Response) => {
  const userData: UserRegisterDTO = userRegisterSchema.parse(req.body);
  const { username, email, password } = userData;

  try {
    const hashedPassword: string = await hashPassword(password);

    const query: string = `INSERT INTO users (username, email, password, role, created_at, updated_at) 
    VALUES (?, ?, ?, 'user', NOW(), NOW())`;

    const [result]: [ResultSetHeader, any] = await pool.execute(query, [username,email,hashedPassword,]);

    const insertId: number = result.insertId;
    const [rows]: [RowDataPacket[], any] = await pool.query("SELECT * FROM users WHERE id = ?", [insertId]);
    const user: User = rows[0] as User;

    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Failed to register user",
    });
  }
};


export const login = async (req: Request<{}, {}, UserLoginDTO>,res: Response) => {
    const userData: UserLoginDTO = userLoginSchema.parse(req.body);
    const { email, password } = userData;
  
    try {
        const [rows]: [RowDataPacket[], any] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        const user: User = rows[0] as User;
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid: boolean = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token: string = generateToken({ id: user.id, username: user.username, email: user.email, role: user.role });
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
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            message: "Failed to log in user",
        });
    }
};