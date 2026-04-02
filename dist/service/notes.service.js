"use strict";
const notesRepository = require("../repository/notes.repository");
exports.getOneNote = async (id, user_id) => {
    const redisRes = await notesRepository.redisGetOneNote(id);
    if (redisRes)
        return redisRes;
    const note = await notesRepository.getOneNote(id, user_id);
    if (!note) {
        throw { status: 404, message: "Заметка с таким id не найдено" };
    }
    return note;
};
exports.getAllNotes = async (user_id, page, limit, q) => {
    let pageSql = Number(page);
    let limitSql = Number(limit);
    pageSql = pageSql || 1;
    limitSql = limitSql || 10;
    pageSql = pageSql < 1 ? 1 : pageSql;
    limitSql = Math.min(limitSql, 50);
    const notes = await notesRepository.getAllNotes(user_id, pageSql, limitSql, q);
    return notes;
};
exports.createNote = async (title, content, user_id) => {
    return await notesRepository.createNote(title, content, user_id);
};
exports.updateNote = async (id, title, content, user_id) => {
    const updatedNote = await notesRepository.updateNote(id, title, content, user_id);
    if (!updatedNote) {
        throw { status: 404, message: "Заметка не найдена" };
    }
    return updatedNote;
};
exports.deleteNote = async (id, user_id) => {
    const deletedNotes = await notesRepository.deleteNote(id, user_id);
    if (!deletedNotes) {
        throw { status: 404, message: "Заметка не найдена" };
    }
    return "Заметка удалена";
};
