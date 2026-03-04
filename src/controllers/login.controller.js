const loginService = require("../service/login.service")

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await loginService.login(email, password);

        res.json(result)
    } catch (err) {
        next(err);
    }
};
