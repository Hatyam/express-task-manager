const userControlService = require("../service/userControl.service");

exports.deleteUser = async (req, res, next) => {
    try {
        await userControlService.deleteUser(req.params.id);
        
        res.status(200).json({message: "Пользователь удален"});
    } catch (err) {
        next(err);
    }
}