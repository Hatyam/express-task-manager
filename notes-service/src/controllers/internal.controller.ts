import { Request, Response } from "express";
import * as internalService from "../services/internal.service";

export const deleteByUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    await internalService.deleteByUser(userId);

    res.sendStatus(200);
};

export const recoverByUser = async (req: Request, res: Response) => {
    const { userId } = req.body;

    await internalService.recoverByUser(userId);

    res.sendStatus(200);
};
