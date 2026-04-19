import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import jwt from "jsonwebtoken";
import * as refreshRepository from "../repository/refresh.repository";
import { User } from "../types/user.types";
import { RefreshTokenReturn } from "../types/refresh.types";
const SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const updateRefreshToken = async (lastRefreshToken: string | undefined): Promise<RefreshTokenReturn> => {
    if (!lastRefreshToken) {
        throw {status: 404, message: "Токен не передан"};
    }

    const hashedLastRefreshToken = crypto
        .createHash("sha256")
        .update(lastRefreshToken)
        .digest("hex");
    const refreshTokenFromBase = await refreshRepository.checkRefresh(
        hashedLastRefreshToken
    );

    if (!refreshTokenFromBase.length)
        throw { status: 404, message: "Неверный токен" };
    
    if (refreshTokenFromBase[0].revoked === true) {
        await refreshRepository.revokeAllUserTokens(
            refreshTokenFromBase[0].user_id);
        throw { status: 401, message: "Токен устарел" };
    }
        
    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    const newHashedRefreshToken = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex");

    await refreshRepository.updateRefreshToken(
        hashedLastRefreshToken,
        newHashedRefreshToken,
        refreshTokenFromBase[0].user_id
    );

    const userByRefreshToken: User = await refreshRepository.findUserById(
        refreshTokenFromBase[0].user_id
    );

    const payload = {
        id: userByRefreshToken.id,
        email: userByRefreshToken.email,
        role: userByRefreshToken.role,
        token_version: userByRefreshToken.token_version,
    };

    const newAccessToken = jwt.sign(payload, SECRET, {
        expiresIn: "30m",
    });

    return { newRefreshToken, newAccessToken };
};
