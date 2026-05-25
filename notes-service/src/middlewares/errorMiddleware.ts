import { ErrorRequestHandler } from "express";
import { AppError } from "../types/error.types";

export const errorMiddleware: ErrorRequestHandler = (
    err: AppError,
    req,
    res,
    next
) => {
    console.error(err);

    res.status(err.status || 500).json({
        message: err.message || "Server error",
    });
};
