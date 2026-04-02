import express from 'express';
import * as foodPartnerController from '../controllers/foodPartner.controller.js';
import * as authFoodPartnerMiddleware from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({
    storage : multer.memoryStorage()
})

/**
 * POST /api/auth/food-partner/register
 */
router.post("/food-partner/register", upload.single("avatar"), foodPartnerController.registerFoodPartner)
 
/**
 * POST /api/auth/food-partner/login
 */
router.post("/food-partner/login", foodPartnerController.login)

/**
 * POST /api/auth/food-partner/logout
 */
router.post("/food-partner/logout",foodPartnerController.logOut)

/**
 * Get food partner details by ID
 * GET  /api/auth/food-partner/:id
 */

router.get("/food-partner/:id",foodPartnerController.getFoodPartnerById)

/**
 * GET - /api/auth/food-partner/me
 */
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
