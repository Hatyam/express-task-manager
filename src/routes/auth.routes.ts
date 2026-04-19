import express, { Router } from "express";

import validateRegister from "../middlewares/validateRegister";
import { register } from "../controllers/register.controller";
import { login } from "../controllers/login.controller";
import { refresh } from "../controllers/refresh.controller";
import { rateLimiting } from "../middlewares/rateLimitingMiddleware";

const router: Router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", rateLimiting, login);
router.post("/refresh", refresh);

export default router;
