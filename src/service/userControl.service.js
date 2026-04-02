const userControlRepository = require("../repository/userControl.repository");

exports.deleteUser = async (id) => {
    const res = await userControlRepository.deleteUser(id);
    if (res === 0) throw { status: 404, message: "Пользователь не найден" };
}

exports.getAllUsers = async () => {
    const res = await userControlRepository.getAllUsers();
    return res;
}