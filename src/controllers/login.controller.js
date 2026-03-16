const loginService = require("../service/login.service")

exports.login = async (req, res, next) => {
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
