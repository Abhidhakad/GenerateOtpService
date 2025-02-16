const express = require("express");
const { generateAndSendOTP, validateOTP } = require("../controllers/otpControllers");

const router = express.Router();

router.post("/generate-otp", generateAndSendOTP);
router.post("/validate-otp", validateOTP);

module.exports = router;
