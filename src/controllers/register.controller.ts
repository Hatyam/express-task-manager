import * as registerService from "../service/register.service";
import {Request, Response, NextFunction} from 'express';
import { LoginRequestBody } from "../types/auth.types";
import { RegisteredUser } from "../types/user.types";

export const register = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        
        const user: RegisteredUser = await registerService.registerUser(email, password);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
