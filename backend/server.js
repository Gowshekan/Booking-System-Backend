const app = require("./index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({path: "./config.env"});

// Disable mongoose buffering
mongoose.set('bufferCommands', false);

console.log("Starting server on port:", process.env.PORT_NO);

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ Database connected successfully to MongoDB Atlas");
    } catch (err) {
        console.log("❌ Database connection failed:", err.message);
        process.exit(1);
    }
};

connectDB();

app.listen(process.env.PORT_NO, () => {
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT_NO}`);
    console.log(`📡 API endpoints available at http://localhost:${process.env.PORT_NO}/api/v1`);
    console.log(`🔍 Health check: http://localhost:${process.env.PORT_NO}/`);
});