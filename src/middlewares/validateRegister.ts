import { Request, Response, NextFunction } from "express";

type RegisterBody = {
    email?: string;
    password?: string;
};

const validateRegister = (
    req: Request<{}, {}, RegisterBody>,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Поля email и password обязательны",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Длина пароля не меньше 6 символов!",
        });
    }

    next();
};

export default validateRegister;
