const express = require("express");
const { registerUser, loginUser, getMe, logoutUser, getLoginLogs } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe); // ✅ Protect this route
router.post("/logout", authMiddleware, logoutUser);
router.get("/logs", authMiddleware, getLoginLogs);


module.exports = router;
