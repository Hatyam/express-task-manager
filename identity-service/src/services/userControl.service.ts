import * as userControlRepository from "../repositories/userControl.repository";
import * as notesClient from "../clients/notes.client";

// ❌ удалить пользователя + его заметки
export const deleteUser = async (id: number) => {
    const res = await userControlRepository.deleteUser(id);

    if (res === 0) {
        throw { status: 404, message: "Пользователь не найден" };
    }

    // 🔥 межсервисное взаимодействие
    await notesClient.deleteNotesByUserId(id);

    return {
        message: "Пользователь и его заметки удалены",
    };
};

// 📋 получить всех пользователей
export const getAllUsers = async () => {
    return await userControlRepository.getAllUsers();
};

// 🔄 восстановить пользователя + заметки
export const recoverUser = async (id: number) => {
    const res = await userControlRepository.recoverUser(id);

    if (res === 0) {
        throw { status: 404, message: "Пользователь не найден" };
    }

    // 🔥 восстановление заметок через notes-service
    await notesClient.recoverNotesByUserId(id);

    return {
        message: "Пользователь и его заметки восстановлены",
    };
};
