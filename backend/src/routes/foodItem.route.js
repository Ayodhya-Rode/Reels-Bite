 import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as foodItem from "../controllers/foodItem.controller.js"
import multer from "multer"

import express from "express"

const router = express.Router()

const upload = multer({
    storage : multer.memoryStorage()
})


/**
 * Only acces to food partner not normal user
 * i.e. we are creating middleware
 */

/**
 * POST /api/food/create-food/[protected]
 * only for food partner - applied authFoodPartnerMiddleware
 */

router.post("/create-food",authMiddleware.authFoodPartnerMiddleware, upload.single("video") ,foodItem.createFood)

/**
 * GET  /api/food/[protected]
 * only for logged-in user to see the food items - 
 */
router.get("/", foodItem.getAllFoodItems)


router.post("/like", authMiddleware.authUserMiddleware, foodItem.likeFoodItem)

router.post("/save", authMiddleware.authUserMiddleware, foodItem.saveFoodItem)


export default router