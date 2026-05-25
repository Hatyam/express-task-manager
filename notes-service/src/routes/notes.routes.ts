import express, { Router } from "express";

import * as notesController from "../controllers/notes.controller";
import { validateNote } from "../middlewares/validateNote";
import { accessMiddleware } from "../middlewares/accessMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router: Router = express.Router();

router.use(express.json());

router.get(
    "/getAllUsersNotes",
    accessMiddleware,
    adminMiddleware,
    notesController.getAllUsersNotes
);

router.get("/:id", accessMiddleware, notesController.getOneNote);

router.get("/", accessMiddleware, notesController.getAllNotes);

router.post("/", accessMiddleware, validateNote, notesController.createNote);

router.put("/:id", accessMiddleware, validateNote, notesController.updateNote);

router.delete("/:id", accessMiddleware, notesController.deleteNote);

export default router;
