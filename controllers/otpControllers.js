const OTP = require("../models/otpModel");
const sendEmail = require("../services/emailService");
const sendSMS = require("../services/smsService");
const { redisClient } = require("../config/db");
const generateSecureOTP = require("../utils/otpGenrate");
// const generateOTP = (length = 6) => {
//     return Math.random().toString().slice(2, 2 + length);
// };

exports.generateAndSendOTP = async (req, res) => {
    try {
      const { identifier, type } = req.body;
  
      if (!identifier || !type) {
        return res.status(400).json({ success: false, message: "Please provide identifier and type" });
      }
  
      const otp = await generateSecureOTP();
  
      const otpRecord = new OTP({ identifier, otp });
      await otpRecord.save();
  
      if (type === "email") {
        const isMailSent = await sendEmail(identifier, otp);
        if (isMailSent) {
          return res.status(200).json({ success: true, otp, message: "OTP sent successfully!" });
        }
        return res.status(500).json({ success: false, message: "Failed to send OTP via email" });
      }
  
      return res.status(400).json({ success: false, message: "Invalid OTP type" });
  
    } catch (error) {
      console.error("Error generating OTP:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
exports.validateOTP = async (req, res) => {
  const { identifier, otp } = req.body;

  try {
    const storedOTP = await redisClient.get(identifier);

    if (storedOTP === otp) {
      return res.status(200).json({ message: "OTP validated successfully!" });
    }

    res.status(400).json({ message: "Invalid or expired OTP" });
  } catch (error) {
    res.status(500).json({ error: "Error validating OTP" });
  }
};
