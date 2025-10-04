import jwt from "jsonwebtoken";
import User from "../config/models/user.model.js"; // adjust path as needed

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Route handler to check authentication
export const checkAuth = (req, res) => {
  res.json({ user: req.user });
};
