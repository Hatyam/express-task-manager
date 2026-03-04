const registerService = require("../service/register.service");

exports.register = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        const user = await registerService.registerUser(email, password);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
