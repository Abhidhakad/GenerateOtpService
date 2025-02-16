const mongoose = require("mongoose");
const redis = require("redis");

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

redisClient.on("connect", () => {
    console.log("Redis connected!");
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
    process.exit(1);
});

module.exports = { connectMongoDB, redisClient };
