import dotenv from "dotenv";
dotenv.config();
import { findByEmail } from "../repository/login.repository";
const jwt = require("jsonwebtoken");
const SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.accessMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Требуется токен" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Требуется токен" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        const token_version_DB = await findByEmail(decoded.email);
        if (decoded.token_version !== token_version_DB.token_version) {
            return res.status(401).json({ message: "Токен устарел" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Неверный токен" });
    }
};
