const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
   try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp} valid for 5 minutes`,
        html: `<h1>Your OTP is: ${otp}</h1>`,
     });
     return true;
   } catch (error) {
        throw error;
   }
};

module.exports = sendEmail;
