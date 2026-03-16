const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/login.repository");

const SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.login = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw { status: 404, message: "Пользователь не найден" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw { status: 404, message: "Неверный пароль" };
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: "5m",
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

    await userRepository.createRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
};
