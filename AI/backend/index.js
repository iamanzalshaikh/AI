// ✅ No need to re-require cors, already imported above
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";  // ✅ Correct
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// ✅ CORS middleware
app.use(cors({
    origin: [
        "https://ai-frontend-9i66.onrender.com", // ✅ user app
        "http://localhost:5174"  // ✅ admin panel
    ],
    credentials: true
}));
// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes)

//AdminRoutes
app.use("/api/auth", authRoutes);

// ✅ Connect to MongoDB
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
    res.send("✅ Hello From Server");
});

// ✅ Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
