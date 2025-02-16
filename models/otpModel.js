const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    identifier: { type: String, required: true }, // email or phone
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 180 }, // 3 minutes expiration
});

module.exports = mongoose.model("OTP", otpSchema);
