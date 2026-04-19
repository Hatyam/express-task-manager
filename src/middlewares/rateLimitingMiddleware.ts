import { Request, Response, NextFunction } from "express";
import redis from "../db/redisConnect";

type RateLimitBody = {
    email?: string,
};

export const rateLimiting = async (
    req: Request<{}, {}, RateLimitBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;
        const ip = req.ip;

        const keyIP = `rate_limit:${ip}`;
        const keyIPEmail = `rate_limit:${ip}:${email}`;

        const ipCount: number = await redis.incr(keyIP);
        if (ipCount === 1) {
            await redis.expire(keyIP, 60);
        }

        if (ipCount > 100) {
            return next({
                status: 429,
                message: "Превышено количество допустимых запросов",
            });
        }

        const ipEmailCount: number = await redis.incr(keyIPEmail);
        if (ipEmailCount === 1) {
            await redis.expire(keyIPEmail, 60);
        }

        if (ipEmailCount > 10) {
            return next({
                status: 429,
                message: "Превышено количество допустимых запросов",
            });
        }

        next();
    } catch (err) {
        next(err);
    }
};
