import express from 'express';
import * as foodPartnerController from '../controllers/foodPartner.controller.js';

const router = express.Router();

router.post("/food-partner/register", foodPartnerController.registerFoodPartner)

router.post("/food-partner/login", foodPartnerController.login)

router.post("/food-partner/logout",foodPartnerController.logOut)

export default router
