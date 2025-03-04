const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Pastikan model User ada
require("dotenv").config(); // Load env variables

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 🔹 Ambil user dari database berdasarkan ID dalam token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error("JWT Error:", error); // Debug error di console
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
