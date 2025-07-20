import express from "express";
import { registration, login, logout, googleLogin, adminLogin } from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post("/registration", registration);
authRoute.post("/login", login);
authRoute.get("/logout", logout);
authRoute.post("/googlelogin", googleLogin);

//Admin
authRoute.post("/adminlogin", adminLogin);

export default authRoute;
