import foodPartnerModel from "../model/foodPartner.model.js";
import foodItemModel from "../model/foodItem.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

/**
 * To register a new FoodPartner
 */
export async function registerFoodPartner(req, res) {
  try {
    const { restaurantName, email, password, phoneNumber, address } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    if (
      !restaurantName ||
      !normalizedEmail ||
      !password ||
      !phoneNumber ||
      !address
    ) {
      return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "Password must be at least 6 characters long",
      });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "Invalid phone number format",
      });
    }

    const isUserAlreadyExists = await foodPartnerModel.findOne({
      email: normalizedEmail,
    });
    if (isUserAlreadyExists) {
      return res.status(409).json({
        error: true,
        type: "CONFLICT_ERROR",
        message: "FoodPartner already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      restaurantName: restaurantName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
    });

    // const refreshToken = jwt.sign(
    //   { id: foodPartner._id },
    //   config.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "7d" }
    // );

    const accessToken = jwt.sign(
      { id: foodPartner._id },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: false, // production मध्ये true ठेव
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      type: "FOOD_PARTNER_CREATED",
      message: "FoodPartner created successfully",
      foodPartner: {
        _id: foodPartner.id,
        restaurantName: foodPartner.restaurantName,
        email: foodPartner.email,
        phoneNumber: foodPartner.phoneNumber,
        address: foodPartner.address,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      error: true,
      type: "SERVER_ERROR",
      message: "Internal server error",
    });
  }
}

/**
 * To login food partner
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "All fields are required",
      });
    }

    const foodPartner = await foodPartnerModel.findOne({
      email: normalizedEmail,
    });
    if (!foodPartner) {
      return res.status(404).json({
        error: true,
        type: "NOT_FOUND_ERROR",
        message: "Invalid credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      foodPartner.password,
    );
    if (!isValidPassword) {
      return res.status(401).json({
        error: true,
        type: "UNAUTHORIZED_ERROR",
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      { id: foodPartner._id },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: false,
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      type: "LOGIN_SUCCESS",
      message: "Food Partner successfully logged in",
      user: {
        _id: foodPartner.id,
        email: foodPartner.email,
        restaurantName: foodPartner.restaurantName, // ✅ updated field
        phoneNumber: foodPartner.phoneNumber,
        address: foodPartner.address,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: true,
      type: "SERVER_ERROR",
      message: "Internal server error",
    });
  }
}

/**
 * To logout food partner
 */
export async function logOut(req, res) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "Access token is not found",
      });
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      // secure: false,
      // sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      type: "LOGOUT_SUCCESS",
      message: "Logged out successfully !",
    });
  } catch (err) {
    console.error("Logout error:", error);
    return res.status(500).json({
      error: true,
      type: "SERVER_ERROR",
      message: "Internal server error",
    });
  }
}

export async function getFoodPartnerById(req, res) {
  try {
    const foodPartnerId = req.params.id;

    if (!foodPartnerId) {
      return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "Food Partner ID is required",
      });
    }

    const foodPartner = await foodPartnerModel.findById({ _id: foodPartnerId });
    const foodItemsByFoodPartner = await foodItemModel.find({ foodPartner: foodPartnerId });
    
    console.log("Searching ID:", foodPartnerId)

    if (!foodPartner) {
      return res.status(404).json({
        error: true,
        type: "NOT_FOUND_ERROR",
        message: "Food Partner not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      type: "FOOD_PARTNER_FETCHED",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        restaurantName: foodPartner.restaurantName,
        phoneNumber: foodPartner.phoneNumber,
        address: foodPartner.address,
        foodItems: foodItemsByFoodPartner
      },
      
    });


  } catch (error) {
    console.error("Login error:", error);
     return res.status(500).json({
      error: true,
      type: "SERVER_ERROR",
      message: "Internal server error",
    });
  }
}
