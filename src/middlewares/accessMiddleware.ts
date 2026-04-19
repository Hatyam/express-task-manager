import dotenv from "dotenv";
dotenv.config();
import { findByEmail } from "../repository/login.repository";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AccessDecodedUser } from "../types/user.types";
const SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const accessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Требуется токен" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Требуется токен" });
    }

    try {
        const decoded = jwt.verify(token, SECRET) as AccessDecodedUser;
        const token_version_DB = await findByEmail(decoded.email);
        if (!token_version_DB) throw {status: 404, message: "Токен не найден"}
        if (decoded.token_version !== token_version_DB.token_version) {
            return res.status(401).json({ message: "Токен устарел" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        next(err);
    }
};
