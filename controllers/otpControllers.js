const OTP = require("../models/otpModel");
const sendEmail = require("../services/emailService");
const sendSMS = require("../services/smsService");
const { redisClient } = require("../config/db");
const generateSecureOTP = require("../utils/otpGenrate")
// const generateOTP = (length = 6) => {
//     return Math.random().toString().slice(2, 2 + length);
// };

exports.generateAndSendOTP = async (req, res) => {
    const { identifier, type } = req.body; // email or phone, type specifies "email" or "sms"
    const otp = generateSecureOTP();

    try {
        const otpRecord = new OTP({ identifier, otp });
        await otpRecord.save();

        if (type === "email") {
            const ismailSent = await sendEmail(identifier, otp);
            if(ismailSent){
                res.status(200).json(
                    {
                    Otp:otp,
                    message: "OTP sent successfully!" 
                    });
               }
         }
        //  else if (type === "sms") {
        //     await sendSMS(identifier, otp);
        // }

        // redisClient.setEx(identifier, 300, otp); // Save in Redis for 5 minutes

        res.status(500).json({success:false,
            message:"Otp not sent"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating OTP" });
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
