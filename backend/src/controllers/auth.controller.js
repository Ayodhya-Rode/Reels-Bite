import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

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

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,        //now only for dev it is false, but it always true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        fullName: fullName.trim() ,
        email: normalizedEmail,
        _id: user.id
      },
      accessToken
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}


/**
 * To login a user
 */

export async function login(req,res){
  try {
    const{email,password} = req.body;

    const normalizedEmail = email.toLowerCase().trim(); 
    
    if (!normalizedEmail || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({email : normalizedEmail})
    
    if(!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
   
    if(!isValidPassword){
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,        //now only for dev it is false, but it always true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    

    return res.status(200).json({
      message: "User successfully logged in",
      user: {
        _id: user.id,
        email: user.email,
        fullName: user.fullName
      },
      accessToken
    })

  } 
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  
}