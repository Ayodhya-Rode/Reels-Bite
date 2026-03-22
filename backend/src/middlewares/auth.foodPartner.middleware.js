import foodPartnerModel from "../model/foodPartner.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

/**
 * Middleware to authenticate a Food Partner
 * - The frontend must send the access token in the request header
 *   Example: Authorization: Bearer <accessToken>
 * - This middleware verifies the token and attaches the Food Partner to req
 */
export async function authFoodPartnerMiddleware(req, res, next) {
  try {
    // 1. Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    // If no header or it doesn't start with "Bearer", deny access
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please login first!" });
    }

    // 2. Extract the token (the part after "Bearer")
    const token = authHeader.split(" ")[1];

    // 3. Verify the token using the ACCESS_TOKEN_SECRET
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    // 4. Find the Food Partner in the database using the decoded id
    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (!foodPartner) {
      return res.status(404).json({ message: "FoodPartner not found" });
    }

    // 5. Attach the Food Partner to the request object
    req.foodPartner = foodPartner;

    // 6. Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired, deny access
    return res.status(401).json({ message: "Invalid token" });
  }
}