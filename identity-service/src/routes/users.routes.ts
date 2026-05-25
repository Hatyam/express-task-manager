import express, { Router } from "express";

import { adminMiddleware } from "../middlewares/adminMiddleware";
import { accessMiddleware } from "../middlewares/accessMiddleware";
import * as userControl from "../controllers/userControl.controller";

const router: Router = express.Router();

router.delete(
    "/:id",
    accessMiddleware,
    adminMiddleware,
    userControl.deleteUser
);

router.get("/", accessMiddleware, adminMiddleware, userControl.getAllUsers);

router.post(
    "/recoverUser/:id",
    accessMiddleware,
    adminMiddleware,
    userControl.recoverUser
);

export default router;
