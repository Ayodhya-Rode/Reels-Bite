import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../model/userSession.model.js";
import crypto from "crypto";

/**
 * To regiter new user
 */

export async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    if (!fullName || !normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const isUserAlreadyExists = await userModel.findOne({
      email: normalizedEmail,
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const activeSessionsCount = await sessionModel.countDocuments({
      user: user._id,
      revoked: false,
    });

    if (activeSessionsCount >= 4) {
      return res.status(403).json({
        message:
          "Maximum device limit reached (4). Logout from another device first.",
      });
    }

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const hashedRefrshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    //  creating new session for user

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash: hashedRefrshToken,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
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
      message: "User Created successfully",
      user: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        _id: user.id,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * To generate new access token from refresh token
 */

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is not found",
      });
    }

    const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

    if (!decoded) {
      return res.status(404).json({
        message: "Invalid Token ",
      });
    }

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // It allow only to login user, if user is logout then it will direct return from here
    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false, // return login user not logout
    });

    if (!session) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
        sessionId: session._id,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign(
      {
        id: decoded.id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      // secure:true,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });

    res.status(200).json({
      message: "Access Token refreshed successful",
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * To login a user
 */

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const activeSessionsCount = await sessionModel.countDocuments({
      user: user._id,
      revoked: false,
    });

    if (activeSessionsCount >= 4) {
      return res.status(403).json({
        message:
          "Maximum device limit reached (4). Logout from another device first.",
      });
    }

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const hashedRefrshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    //  creating new session for user

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash: hashedRefrshToken,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
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
      message: "User successfully logged in",
      user: {
        _id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * To logout from current (one) device
 */

export async function logOut(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is not found",
    });
  }

  const hashedRefrshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshTokenHash: hashedRefrshToken,
    revoked: false,
  });

  if (!session) {
    return res.status(400).json({
      message: " Invalid refresh token",
    });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "Logged out successfully !",
  });
}

/**
 * To logout from all devices
 */

export async function logoutAll(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

  await sessionModel.updateMany(
    {
      user: decoded.id,
      revoked: false,
    },
    { revoked: true },
  );

  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "Logout all devices successfully!",
  });
}
