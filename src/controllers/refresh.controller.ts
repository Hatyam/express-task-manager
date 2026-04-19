import * as refreshService from "../service/refresh.service";
import { CookieRefreshToken } from "../types/refresh.types";
import {Request, Response, NextFunction} from 'express';
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refresh_token }: CookieRefreshToken = req.cookies;
        
        const {newRefreshToken, newAccessToken} = await refreshService.updateRefreshToken(refresh_token);

        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        res.json({newAccessToken});
    } catch (err) {
        next(err);
    }
}