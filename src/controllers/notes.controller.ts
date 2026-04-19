import * as notesService from "../service/notes.service.js";
import { Request, Response, NextFunction } from "express";
import { Note, NoteIdParams } from "../types/notes.types.js";
import { GetAllNotesQuery } from "../types/query.types.js";

export const getOneNote = async (req: Request<NoteIdParams>, res: Response, next: NextFunction) => {
    try {
        const note = await notesService.getOneNote(Number(req.params.id), req.user.id);

        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
}

export const getAllNotes = async (req: Request<{}, {}, {}, GetAllNotesQuery>, res: Response, next: NextFunction) => {
    try {
        const {page, limit, q} = req.query;

        const notes = await notesService.getAllNotes(req.user.id, page, limit, q);

        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
}

export const createNote = async (req: Request<{}, {}, Note>, res: Response, next: NextFunction) => {
    try {
        const note = await notesService.createNote(req.body.title, req.body.content, req.user.id);

        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
}

export const updateNote = async (req: Request<NoteIdParams, {}, Note>, res: Response, next: NextFunction) => {
    try {
        const note = await notesService.updateNote({ id: Number(req.params.id), title: req.body.title, content: req.body.content, user_id: req.user.id });

        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
}

export const deleteNote = async (req: Request<NoteIdParams>, res: Response, next: NextFunction) => {
    try {
        const message = await notesService.deleteNote(Number(req.params.id), req.user.id);

        res.status(200).json({message});
    } catch (err) {
        next(err);
    }
}

export const getAllUsersNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await notesService.getAllUsersNotes();

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}