import { Request, Response } from "express";

const ServerCheck = (req: Request, res: Response) => {
    res.status(200).json({ message: "✅ Server is running!" });
};

export default ServerCheck;