import { authFoodPartnerMiddleware } from "../middlewares/auth.foodPartner.middleware.js"
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
 */

router.post("/",authFoodPartnerMiddleware, upload.single("video") ,foodItem.createFood)

export default router