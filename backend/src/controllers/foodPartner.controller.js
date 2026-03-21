import foodPartnerModel from "../model/foodPartner.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

/**
 * To register a new FoodPartner
 */

export async function registerFoodPartner(req, res) {
  try {
    const {name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const isUserAlreadyExists = await foodPartnerModel.findOne({
      email: normalizedEmail,
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({ message: "FoodPartner is already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const refreshToken = jwt.sign(
      {
        id: foodPartner._id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const accessToken = jwt.sign(
      {
        id: foodPartner._id,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //now only for dev it is false, but it always true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "FoodPartner Created successfully",
      foodPartner: {
        name: name.trim(),
        email: normalizedEmail,
        _id: foodPartner.id,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
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
      return res.status(400).json({ message: "All fields are required" });
    }

    const foodPartner = await foodPartnerModel.findOne({ email: normalizedEmail });

    if (!foodPartner) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, foodPartner.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const refreshToken = jwt.sign(
      {
        id: foodPartner._id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const accessToken = jwt.sign(
      {
        id: foodPartner._id,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //now only for dev it is false, but it always true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Food Partner successfully logged in",
      user: {
        _id: foodPartner.id,
        email: foodPartner.email,
        name: foodPartner.name,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * To logout food partner
 */

export async function logOut(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is not found",
    });
  }

  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "Logged out successfully !",
  });
}
