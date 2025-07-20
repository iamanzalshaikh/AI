import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("🔵 Token from cookie =", token);
        if (!token) {
            return res.status(400).json({ message: "User doesnt have valid token" })

        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(400).json({ message: "Doesnt have valif token" })

        }

        req.userId = verifyToken.id;
        return next()



    } catch (error) {
        // console.log("🔴 Google login error in isAuth:", error.message);
        return res.status(500).json({ message: `google login error ${error.message}` });
    }

}

export default isAuth