import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRegisterDTO, UserLoginDTO, UpdateUserDTO, UserDeleteDTO } from "../interfaces/auth.interfaces";
import { userRegisterSchema, userLoginSchema, updateUserSchema, userDeleteSchema } from "../interfaces/auth.interfaces";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { generateToken } from "../utils/auth.middleware";
import { JWTUserPayload } from "../interfaces/auth.interfaces";
import { IUserDocument } from "../models/User";

class AuthController {

  static async register(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
    const registerData: UserRegisterDTO = userRegisterSchema.parse(req.body);
    const { username, email, password } = registerData;
    try {
      const hashedPassword: string = await hashPassword(password);
      const user: IUserDocument = await User.create({ username, email, password: hashedPassword });
      res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  static async login(req: Request<{}, {}, UserLoginDTO>, res: Response): Promise<void> {
    const loginData: UserLoginDTO = userLoginSchema.parse(req.body);
    const { email, password } = loginData;
    try {

      const user: IUserDocument | null = await User.findOne({ email }).exec();
      if (!user) {
        res.status(401).json({ success: false, error: "Invalid email or password" });
        return;
      }

      const isPasswordValid: boolean = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, error: "Invalid email or password" });
        return;
      }
      const Payloads: JWTUserPayload = {_id: user._id, username: user.username, email: user.email, role: user.role,}
      const token: string = generateToken(Payloads);
      res.json({ success: true, message: "Logged in successfully", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const userId = req.auth?._id;
    if (!userId) {
      res.status(401).json({ success: false, error: "Unauthorized" });
      return;
    }
    res.status(200).json({ success: true, message: `Logged out successfully ${userId}` });
  }

  static async update(req: Request<{}, {}, UpdateUserDTO>, res: Response): Promise<void> {
    const updateData: UpdateUserDTO = updateUserSchema.parse(req.body);
    const { username, email, password, newpassword } = updateData;
    const userId = req.auth?._id;

    try {
      const user: IUserDocument | null = await User.findById(userId).exec();
      if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }

      const isPasswordValid: boolean = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, error: "Invalid current password" });
        return;
      }

      if (username !== undefined) user.username = username;
      if (email !== undefined) user.email = email;
      if (newpassword) user.password = await hashPassword(newpassword);

      const updatedUser = await user.save();

      res.json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  static async delete(req: Request<UserDeleteDTO, {}, {}>, res: Response): Promise<void> {
    const deleteData: UserDeleteDTO = userDeleteSchema.parse(req.body);
    const { email, password } = deleteData;
    const userId = req.auth?._id;
    try {
      const user: IUserDocument | null = await User.findOne({ email }).exec();
      if (!user) {
        res.status(401).json({ success: false, error: "Invalid email or password" });
        return;
      }
      const isPasswordValid: boolean = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, error: "Invalid email or password" });
        return;
      }
      const deletedUser = await User.findByIdAndDelete(userId).exec();
      if (!deletedUser) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
      }
      res.json({ success: true, message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
      return;
    }
  }
}

export default AuthController;