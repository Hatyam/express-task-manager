const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes.controller");
const { validateNote } = require("../middlewares/validateNote");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(express.json());

router.get("/:id", authMiddleware, notesController.getOneNote);

router.get("/", authMiddleware, notesController.getAllNotes);

router.post("/", authMiddleware, validateNote, notesController.createNote);

router.put("/:id", authMiddleware, validateNote, notesController.updateNote);

router.delete("/:id", authMiddleware, notesController.deleteNote);

module.exports = router;