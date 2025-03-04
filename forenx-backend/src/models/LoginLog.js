const mongoose = require("mongoose");

const LoginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  ip: { type: String, required: true },
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date },
});

module.exports = mongoose.model("LoginLog", LoginLogSchema);
