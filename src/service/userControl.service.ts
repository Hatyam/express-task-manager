import * as userControlRepository from "../repository/userControl.repository";

export const deleteUser = async (id: number) => {
    const res = await userControlRepository.deleteUser(id);
    if (res === 0) throw { status: 404, message: "Пользователь не найден" };
}

export const getAllUsers = async () => {
    const res = await userControlRepository.getAllUsers();
    return res;
}

export const recoverUser = async (id: number) => {
    const res = await userControlRepository.recoverUser(id);
    if (res === 0) throw { status: 404, message: "Пользователь не найден" };
    return {message: "Пользователь и его заметки восстановлены"};
}