 import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as foodItem from "../controllers/foodItem.controller.js"
import multer from "multer"


import express from "express"

const router = express.Router()

const upload = multer({
    storage : multer.memoryStorage()
})


/**
 * POST /api/food/create-food/[protected]
 * only for food partner - applied authFoodPartnerMiddleware
 */

router.post("/create-food",authMiddleware.authFoodPartnerMiddleware, upload.single("video") ,foodItem.createFood)

/**
 * GET  /api/food/
 *All logged-in user and food partners  see the food items - 
 */
router.get("/", foodItem.getAllFoodItems)

/**
 * POST /api/food/like [protected]
 * only for logged-in users - applied authUserMiddleware
 */
router.post("/like", authMiddleware.authUserMiddleware, foodItem.likeFoodItem)

/**
 * POST /api/food/save [protected]
 * only for logged-in users - applied authUserMiddleware
 */
router.post("/save", authMiddleware.authUserMiddleware, foodItem.saveFoodItem)



export default router