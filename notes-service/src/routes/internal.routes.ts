import express from "express";
import * as internalController from "../controllers/internal.controller";

const router = express.Router();

router.post("/notes/delete-by-user", internalController.deleteByUser);

router.post("/notes/recover-by-user", internalController.recoverByUser);

export default router;
