import express from "express";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js"; // ✅ correct import
import { getAdmin, getCurrentUser } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/getCurrentuser", isAuth, getCurrentUser);

// Admin
userRoutes.get("/getadmin", adminAuth, getAdmin);

export default userRoutes;
