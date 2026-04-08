const redis = require("../db/redisConnect");

exports.rateLimiting = async (req, res, next) => {
    const { email } = req.body;
    const { ip } = req;

    const keyIP = `rate_limit:${ip}`;
    const keyIPEmail = `rate_limit:${ip}:${email}`;

    let ipCount = await redis.incr(keyIP);
    if (ipCount === 1) {
        await redis.expire(keyIP, 60);
    }

    if (ipCount > 100) {
        throw {status: 429, message: "Превышено количество допустимых запросов"};
    }

    let ipEmailCount = await redis.incr(keyIPEmail);
    if (ipEmailCount === 1) {
        await redis.expire(keyIPEmail, 60);
    }

    if (ipEmailCount > 10) {
        throw {status: 429, message: "Превышено количество допустимых запросов"};
    }

    next();
}