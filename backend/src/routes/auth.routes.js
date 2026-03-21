import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * POST /api/auth/user/register
 */

router.post("/user/register", authController.registerUser);

/**
 * GET - /api/auth/user/refresh-token
 */

router.get("/user/refresh-token", authController.refreshToken)

/**
 * POST /api/auth/user/login
 */

router.post("/user/login", authController.login)

/**
 * POST /api/auth/user/logout
 */

router.post("/user/logout", authController.logOut)

/**
 * POST /api/auth/user/logout-all
 */

router.post("/user/logout-all", authController.logoutAll)

export default router;  