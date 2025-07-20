import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import genToken, { genToken1 } from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const token = genToken(user._id);

       res.cookie("token", token, {
  httpOnly: true,
  secure: true,        
  sameSite: "None",    
  maxAge: 7 * 24 * 60 * 60 * 1000
});


        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found " });
        }

        let isMatch = await bcrypt.compare(password, user.password)



        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }

        const token = genToken(user._id);

      res.cookie("token", token, {
  httpOnly: true,
           secure: true,
  sameSite: "None",   
  maxAge: 7 * 24 * 60 * 60 * 1000
});

        res.status(201).json({
            message: "Login successful",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("❌ Logout Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });

        // If user doesn't exist, create one
        if (!user) {
            user = await User.create({ name, email });
        }

        const token = genToken(user._id);

    res.cookie("token", token, {
  httpOnly: true,
  secure: true,        
  sameSite: "None",    
  maxAge: 7 * 24 * 60 * 60 * 1000
});

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("❌ Google Login Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = await genToken1(email); // Make sure genToken1 is imported

          res.cookie("token", token, {
  httpOnly: true,
  secure: true,        
  sameSite: "None",    
  maxAge: 7 * 24 * 60 * 60 * 1000
});

            return res.status(200).json({ token });
        }

        return res.status(401).json({
            message: "Invalid credentials"
        });

    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
