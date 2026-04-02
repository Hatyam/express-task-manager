const pool = require("../db/database");

exports.adminMiddleware = async (req, res, next) => {
    try {
        const {role} = req.user;

        if (role != 'admin') {
            throw { status: 403, message: "Недостаточно прав"};
        }
        next();
    } catch (err) {
        next(err);
    }
}