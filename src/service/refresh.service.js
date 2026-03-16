const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const refreshRepository = require("../repository/refresh.repository");
const SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.updateRefreshToken = async (lastRefreshToken) => {
    const hashedLastRefreshToken = crypto.createHash("sha256").update(lastRefreshToken).digest("hex");
    const refreshTokenFromBase = await refreshRepository.checkRefresh(hashedLastRefreshToken);

    if (!refreshTokenFromBase.length)
        throw {status: 404, message: "Неверный токен"};

    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    const newHashedRefreshToken = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

    await refreshRepository.updateRefreshToken(hashedLastRefreshToken, newHashedRefreshToken, refreshTokenFromBase[0].user_id);

    const payload =  { id: refreshTokenFromBase[0].user_id, email: await refreshRepository.findEmailById(refreshTokenFromBase[0].user_id)};

    const newAccessToken = jwt.sign(payload, SECRET, {
        expiresIn: "5m",
    })

    return { newRefreshToken, newAccessToken };
}