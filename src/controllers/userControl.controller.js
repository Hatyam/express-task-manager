const userControlService = require("../service/userControl.service");

exports.deleteUser = async (req, res, next) => {
    try {
        await userControlService.deleteUser(req.params.id);
        
        res.status(200).json({message: "Пользователь удален"});
    } catch (err) {
        next(err);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await userControlService.getAllUsers();

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

exports.recoverUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await userControlService.recoverUser(id);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}