const express = require("express");
const { getSystemInfo } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/system-info", authMiddleware, getSystemInfo); // ✅ Pastikan route ini ada

module.exports = router;
