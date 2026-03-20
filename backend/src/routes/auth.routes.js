import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * POST /api/auth/user/register
 */

router.post("/user/register", authController.registerUser);



export default router;  