const notesService = require("../service/notes.service.js");

exports.getOneNote = async (req, res, next) => {
    try {
        const note = await notesService.getOneNote(Number(req.params.id), req.user.id);

        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
}

exports.getAllNotes = async (req, res, next) => {
    try {
        const {page, limit, q} = req.query;

        const notes = await notesService.getAllNotes(req.user.id, page, limit, q);

        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
}

exports.createNote = async (req, res, next) => {
    try {
        const note = await notesService.createNote(req.body.title, req.body.content, req.user.id);

        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
}

exports.updateNote = async (req, res, next) => {
    try {
        const note = await notesService.updateNote(Number(req.params.id), req.body.title, req.body.content, req.user.id);

        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
}

exports.deleteNote = async (req, res, next) => {
    try {
        const message = await notesService.deleteNote(Number(req.params.id), req.user.id);

        res.status(200).json({message});
    } catch (err) {
        next(err);
    }
}