"use strict";
// const express = require('express');
// const router = express.Router();
// const { Register, Login } = require('../controllers/login_register_controller');
// const validate = require('../middleware/validate');
// const { registerSchema , loginSchema } = require('../validators/auth');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post('/register', validate(registerSchema), Register);
// router.post('/login', validate(loginSchema), Login);
// module.exports = router;
const express_1 = __importDefault(require("express"));
const { register, login } = require('../controllers/auth.controller');
const router = express_1.default.Router();
router.post('/register', register);
router.post('/login', login);
exports.default = router;
