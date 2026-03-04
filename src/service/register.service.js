const bcrypt = require("bcrypt");
const registerRepository = require("../repository/register.repository");

exports.registerUser = async (email, password) => {
    const existingUser = await registerRepository.findByEmail(email);

    if (existingUser) {
        throw {status: 400, message: "User already exists"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await registerRepository.registerUser(email, hashedPassword);
};
