import * as userControlService from "../service/userControl.service";
import { Request, Response, NextFunction } from "express";
import { DeleteUserParams } from "../types/user.types";

export const deleteUser = async (
    req: Request<DeleteUserParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        await userControlService.deleteUser(Number(req.params.id));

        res.status(200).json({ message: "Пользователь удален" });
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await userControlService.getAllUsers();

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const recoverUser = async (
    req: Request<DeleteUserParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const result = await userControlService.recoverUser(Number(id));

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
