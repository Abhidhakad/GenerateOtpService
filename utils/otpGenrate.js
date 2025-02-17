const crypto = require("crypto");

const generateSecureOTP = async (length = 4) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp = otp+ digits[crypto.randomInt(0, digits.length)];
    }
    return otp;
};

module.exports = generateSecureOTP;
