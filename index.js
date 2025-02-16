require("dotenv").config();
const express = require("express");
const { connectMongoDB, redisClient } = require("./config/db");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

// middleware to parse json data
app.use(express.json());

app.use("/api/otp", otpRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connectMongoDB();
    // redisClient.connect();
    console.log(`Server running on port ${PORT}`);
});


