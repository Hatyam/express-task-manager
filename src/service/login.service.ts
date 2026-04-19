import dotenv from "dotenv";
dotenv.config();

import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repository/login.repository";
import { User } from "../types/user.types";

const SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const login = async (email: string, password: string) => {
    const user: User | null = await userRepository.findByEmail(email);

    if (!user) {
        throw { status: 404, message: "Пользователь не найден" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw { status: 404, message: "Неверный пароль" };
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role, token_version: user.token_version }, SECRET, {
        expiresIn: "30m",
    });
    
    const refreshToken = crypto.randomBytes(64).toString("hex");
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

    await userRepository.createRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
};
