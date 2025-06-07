"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerCheck = (req, res) => {
    res.status(200).json({ message: "✅ Server is running!" });
};
exports.default = ServerCheck;
