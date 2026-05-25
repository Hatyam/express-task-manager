import { Router } from "express";
import * as notesClient from "../clients/notes.client";

const router = Router();

const getToken = (req: any) => req.headers.authorization;

// GET all notes
router.get("/", (req, res, next) =>
    notesClient
        .getAllNotes(getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

// GET one note
router.get("/:id", (req, res, next) =>
    notesClient
        .getOneNote(req.params.id, getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

// CREATE
router.post("/", (req, res, next) =>
    notesClient
        .createNote(getToken(req), req.body)
        .then((r) => res.json(r.data))
        .catch(next)
);

// UPDATE
router.put("/:id", (req, res, next) =>
    notesClient
        .updateNote(req.params.id, getToken(req), req.body)
        .then((r) => res.json(r.data))
        .catch(next)
);

// DELETE
router.delete("/:id", (req, res, next) =>
    notesClient
        .deleteNote(req.params.id, getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

// ADMIN
router.get("/getAllUsersNotes", (req, res, next) =>
    notesClient
        .getAllUsersNotes(getToken(req))
        .then((r) => res.json(r.data))
        .catch(next)
);

export default router;
