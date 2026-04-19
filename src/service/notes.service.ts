import * as notesRepository from "../repository/notes.repository";
import { UpdateNoteParams } from "../types/notes.types";

export const getOneNote = async (id: number, user_id: number) => {
    const redisRes = await notesRepository.redisGetOneNote(id);
    if (redisRes)
        return redisRes;

    const note = await notesRepository.getOneNote(id, user_id);

    if (!note) {
        throw {status: 404, message: "Заметка с таким id не найдено"};
    }

    return note;
}

export const getAllNotes = async (
    user_id: number,
    page: string | undefined,
    limit: string | undefined,
    q: string | undefined
) => {
    let pageSql = Number(page);
    let limitSql = Number(limit);

    pageSql = pageSql || 1;
    limitSql = limitSql || 10;

    pageSql = pageSql < 1 ? 1 : pageSql;
    limitSql = Math.min(limitSql, 50);

    const notes = await notesRepository.getAllNotes(
        user_id,
        pageSql,
        limitSql,
        q
    );

    return notes;
};

export const createNote = async (title: string, content: string, user_id: number) => {
    return await notesRepository.createNote(title, content, user_id);
}

export const updateNote = async ({id, title, content, user_id}: UpdateNoteParams) => {
    const updatedNote = await notesRepository.updateNote({id, title, content, user_id});

    if (!updatedNote) {
        throw {status: 404, message: "Заметка не найдена"};
    }

    return updatedNote;
}

export const deleteNote = async (id: number, user_id: number) => {
    const deletedNotes = await notesRepository.deleteNote(id, user_id);

    if (!deletedNotes) {
        throw {status: 404, message: "Заметка не найдена"};
    }

    return "Заметка удалена";
}

export const getAllUsersNotes = async () => {
    const result = await notesRepository.getAllUsersNotes();

    return result;
}