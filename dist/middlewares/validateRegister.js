"use strict";
module.exports = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Поля email и password обязательны" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Длина парля не меньше 6 символов!" });
    }
    next();
};
