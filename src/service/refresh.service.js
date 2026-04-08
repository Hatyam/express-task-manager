import dotenv from "dotenv";
dotenv.config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const refreshRepository = require("../repository/refresh.repository");
const SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.updateRefreshToken = async (lastRefreshToken) => {
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

    const payload = {
        id: refreshTokenFromBase[0].user_id,
        email: await refreshRepository.findUserById(
            refreshTokenFromBase[0].user_id
        ).email,
        role: await refreshRepository.findUserById(
            refreshTokenFromBase[0].user_id
        ).role,
        token_version:await refreshRepository.findUserById(
            refreshTokenFromBase[0].user_id).token_version ,
    };

    const newAccessToken = jwt.sign(payload, SECRET, {
        expiresIn: "30m",
    });

    return { newRefreshToken, newAccessToken };
};
