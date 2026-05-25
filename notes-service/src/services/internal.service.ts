import * as notesRepository from "../repositories/notes.repository";

export const deleteByUser = async (userId: number) => {
    await notesRepository.deleteByUser(userId);
};

export const recoverByUser = async (userId: number) => {
    await notesRepository.recoverByUser(userId);
};
