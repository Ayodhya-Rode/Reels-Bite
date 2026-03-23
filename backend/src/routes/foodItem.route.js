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

router.post("/",authMiddleware.authFoodPartnerMiddleware, upload.single("video") ,foodItem.createFood)

/**
 * GET  /api/food/[protected]
 * only for user to see the food items - 
 */
router.get("/", authMiddleware.authUserMiddleware, foodItem.getAllFoodItems)


export default router