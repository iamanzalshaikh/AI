import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ MongoDB connected successfully")
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message)
        process.exit(1) // Stop server if DB fails
    }
}


export default connectDb
