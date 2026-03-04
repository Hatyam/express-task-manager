const notesRepository = require("../repository/notes.repository");

exports.getOneNote = async (id ,user_id) => {
    const note = await notesRepository.getOneNote(id, user_id);

    if (!note) {
        throw {status: 404, message: "Заметка с таким id не найдено"};
    }

    return note;
}

exports.getAllNotes = async (user_id) => {
    const notes = await notesRepository.getAllNotes(user_id);

    return notes;
}

exports.createNote = async (title, content, user_id) => {
    return await notesRepository.createNote(title, content, user_id);
}

exports.updateNote = async (id, title, content, user_id) => {
    const updatedNote = await notesRepository.updateNote(id, title, content, user_id);

    if (!updatedNote) {
        throw {status: 404, message: "Заметка не найдена"};
    }

    return updatedNote;
}

exports.deleteNote = async (id, user_id) => {
    const deletedNotes = await notesRepository.deleteNote(id, user_id);

    if (!deletedNotes) {
        throw {status: 404, message: "Заметка не найдена"};
    }

    return "Заметка удалена";
}
