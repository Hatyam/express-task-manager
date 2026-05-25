import { Request, Response, NextFunction } from "express";

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { role } = req.user;

        if (role !== "admin") {
            throw { status: 403, message: "Недостаточно прав" };
        }

        next();
    } catch (err) {
        next(err);
    }
};
