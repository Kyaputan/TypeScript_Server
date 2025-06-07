import express , { Router } from 'express';

const { register , login } = require('../controllers/auth.controller');

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;