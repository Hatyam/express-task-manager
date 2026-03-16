const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes.controller");
const { validateNote } = require("../middlewares/validateNote");
const { accessMiddleware } = require("../middlewares/accessMiddleware");

router.use(express.json());

router.get("/:id", accessMiddleware, notesController.getOneNote);

router.get("/", accessMiddleware, notesController.getAllNotes);

router.post("/", accessMiddleware, validateNote, notesController.createNote);

router.put("/:id", accessMiddleware, validateNote, notesController.updateNote);

router.delete("/:id", accessMiddleware, notesController.deleteNote);

module.exports = router;