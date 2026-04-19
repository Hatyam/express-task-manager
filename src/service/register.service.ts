import bcrypt from "bcrypt";
import * as registerRepository from "../repository/register.repository";
import { RegisteredUser, User } from "../types/user.types";

export const registerUser = async (email: string, password: string): Promise<RegisteredUser> => {
    const existingUser: User | null = await registerRepository.findByEmail(email);

    if (existingUser) {
        throw {status: 400, message: "User already exists"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return registerRepository.registerUser(email, hashedPassword);
};
