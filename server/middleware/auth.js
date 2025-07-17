
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//  Middleware to protect routes using Bearer token
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if token is missing or not in Bearer format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided in Authorization header",
      });
    }

    // 2. Extract token string from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // 3. Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user in database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Attach user to request
    req.user = user;
    next(); // Proceed to controller
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

//  Controller to check if user is authenticated
export const checkUserAuth = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
