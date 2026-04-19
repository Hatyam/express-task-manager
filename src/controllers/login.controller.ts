import { Request, Response, NextFunction } from "express";
import {LoginRequestBody} from "../types/auth.types";
import * as loginService from "../service/login.service";

export const login = async (req: Request<{}, {}, LoginRequestBody>,
     res: Response, 
     next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const {accessToken, refreshToken } = await loginService.login(email, password);

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken })
    } catch (err) {
        next(err);
    }
};
