import express from 'express';
import { register, login, addUser } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

//  Admin add other users
router.post('/add-user', authenticate, addUser);

export default router;
