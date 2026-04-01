import express from 'express';
import * as foodPartnerController from '../controllers/foodPartner.controller.js';
import * as authFoodPartnerMiddleware from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({
    storage : multer.memoryStorage()
})

router.post("/food-partner/register", upload.single("avatar"), foodPartnerController.registerFoodPartner)
 
router.post("/food-partner/login", foodPartnerController.login)

router.post("/food-partner/logout",foodPartnerController.logOut)

/**
 * Get food partner details by ID
 * GET  /api/auth/food-partner/:id
 */

router.get("/food-partner/:id",foodPartnerController.getFoodPartnerById)

router.get(
  "/me",
  authFoodPartnerMiddleware.authFoodPartnerMiddleware,
  (req, res) => {
    return res.json({
      foodPartner: {
        _id: req.foodPartner._id,
        restaurantName: req.foodPartner.restaurantName,
        email: req.foodPartner.email,
        avatar: req.foodPartner.avatar
      }
    })
  }
)

export default router
