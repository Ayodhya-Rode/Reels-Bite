import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * POST /api/auth/user/register
 */

router.post("/user/register", authController.registerUser);

/**
 * POST /api/auth/user/login
 */

router.post("/user/login", authController.login)

router.post("/user/logout", authController.logOut)

router.post("/user/logout-all", authController.logoutAll)

export default router;  