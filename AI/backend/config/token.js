import jwt from "jsonwebtoken";

// Reusable token generator
const genToken = (userId) => {
    return jwt.sign(
        { id: userId }, //
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export default genToken;

export const genToken1 = (email) => {
    return jwt.sign(
        ({ email }), //
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};


