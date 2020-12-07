import express from 'express';
import { createUser } from '../controllers/user.js';

const userRoutes = express.Router();
userRoutes.post('/create', createUser);

export default userRoutes;