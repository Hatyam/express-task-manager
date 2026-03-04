const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/login.repository");

const SECRET = process.env.JWT_SECRET;

exports.login = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw { status: 404, message: "Пользователь не найден" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw { status: 404, message: "Неверный пароль" };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: "1h",
    });

    return { token };
};
