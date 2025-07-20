import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password");
        console.log("🔵 Reached getCurrentUser route");
        console.log("req.userId =", req.userId);
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // ✅ Send user if found
        return res.status(200).json(user);

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: `getCurrentuser ${error}` });
    }
};


export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;

        if (!adminEmail) {
            return res.status(404).json({ message: "admin not found" });
        }

        return res.status(200).json({
            email: adminEmail,
            role: "admin" // ✅ fixed: use string "admin"
        });

    } catch (error) {
        return res.status(500).json({ message: `get admin error ${error}` });
    }
};
