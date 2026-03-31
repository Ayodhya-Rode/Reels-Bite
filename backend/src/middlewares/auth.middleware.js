import foodPartnerModel from "../model/foodPartner.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../model/user.model.js";

/**
 * Middleware to authenticate a Food Partner
 * - The frontend must send the access token in the request header
 *   Example: Authorization: Bearer <accessToken>
 * - This middleware verifies the token and attaches the Food Partner to req
 */
export async function authFoodPartnerMiddleware(req, res, next) {
  try {
    // 1. Get the Authorization header from the request
    const accessToken = req.cookies.accessToken

    // If no header or it doesn't start with "Bearer", deny access
    if (!accessToken) {
      return res.status(401).json({ message: "Please login first!" });
    }

  
    // 3. Verify the token using the ACCESS_TOKEN_SECRET
    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);

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

/**
 * Middleware to authenticate a User
 * - This middleware verifies the token and attaches the User to req
 */

export async function authUserMiddleware(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
      return res.status(401).json({ message: "Please login first!" });
    } 

    
    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);

    const user = await userModel.findById(decoded.id);  

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
    
  }catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

}