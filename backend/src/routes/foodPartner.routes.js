import express from 'express';
import * as foodPartnerController from '../controllers/foodPartner.controller.js';
import * as authFoodPartnerMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/food-partner/register", foodPartnerController.registerFoodPartner)
 
router.post("/food-partner/login", foodPartnerController.login)

router.post("/food-partner/logout",foodPartnerController.logOut)

/**
 * Get food partner details by ID
 * GET  /api/auth/food-partner/:id
 */

router.get("/food-partner/:id",foodPartnerController.getFoodPartnerById)

export default router
