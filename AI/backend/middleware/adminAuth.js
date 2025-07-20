import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({ message: "Not Authorized valid token" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
        return res.status(400).json({ message: "invalid token" });
    }

    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
};

export default adminAuth;
