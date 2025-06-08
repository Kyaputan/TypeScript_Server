import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRegisterDTO , UserLoginDTO, UpdateUserDTO, UserDeleteDTO } from "../interfaces/auth.interfaces";
import { userRegisterSchema , userLoginSchema , updateUserSchema , userDeleteSchema } from "../interfaces/auth.interfaces";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { generateToken } from "../utils/auth.middleware";

class AuthController {

    static async register(req: Request <{}, any, UserRegisterDTO>, res: Response): Promise<void> {
      const registerData: UserRegisterDTO = userRegisterSchema.parse(req.body);
      const { username, email, password } = registerData;
      try {
        const hashedPassword: string = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ success: true, message: "User registered successfully", user });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }

    static async login(req: Request <{}, any, UserLoginDTO>, res: Response): Promise<void> {
      const loginData: UserLoginDTO = userLoginSchema.parse(req.body);
      const { email, password } = loginData;
      try {

        const user = await User.findOne({ email }).exec();
        if (!user) {
          res.status(401).json({success: false, error: "Invalid email or password"});
          return;
      }

        const isPasswordValid : boolean = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({success: false, error: "Invalid email or password" });
          return;
        }

        const token: string = generateToken({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        });
        res.json({ success: true, message: "Logged in successfully", token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      } 
    }

    static async logout(req: Request, res: Response): Promise<void> {
      const userId = req.auth?._id;
    
      if (!userId) {
        res.status(401).json({success: false, error: "Unauthorized" });
        return;
      }
    
      res.status(200).json({success: true, message: `Logged out successfully ${userId}` });
    }

    static async update(req: Request <{}, any, UpdateUserDTO>, res: Response): Promise<void> {
      const updateData: UpdateUserDTO = updateUserSchema.parse(req.body);
      const { username, email, password } = updateData;
      const userId = req.auth?._id;
      const updateFields : any = {};

      if (username !== undefined) updateFields.username = username;
      if (email !== undefined) updateFields.email = email;
      if (password) {
        const hash : string = await hashPassword(password);
        updateFields.password = hash;
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true }).exec();
        if (!updatedUser) {
          res.status(404).json({success: false, error: "User not found" });
          return;
        }
        res.json({ success: true, message: "User updated successfully", user: updatedUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
      }
    }

    static async delete(req: Request <UserDeleteDTO, any, {} , any>, res: Response): Promise<void> {
      const deleteData: UserDeleteDTO = userDeleteSchema.parse(req.body);
      const { email, password } = deleteData;
      const userId = req.auth?._id;

      try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
          res.status(401).json({success: false, error: "Invalid email or password" });
          return;
      }

        const isPasswordValid : boolean = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({success: false, error: "Invalid email or password" });
          return;
        }
        const deletedUser = await User.findByIdAndDelete(userId).exec();
        if (!deletedUser) {
          res.status(404).json({success: false, error: "User not found" });
          return;
        }
        res.json({success: true, message: "User deleted successfully", user: deletedUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
      }
    }
}

export default AuthController;