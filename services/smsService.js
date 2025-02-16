const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, otp) => {
  try {
   const res =  await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
    });
    console.log(res);
  } catch (error) {
    console.log("Error: ",error);
    throw error;
  }
};

module.exports = sendSMS;
