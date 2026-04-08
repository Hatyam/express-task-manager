const express = require("express");
const validateRegister = require("../middlewares/validateRegister");
const { register } = require("../controllers/register.controller");
const { login } = require("../controllers/login.controller");
const { refresh } = require("../controllers/refresh.controller");
const { rateLimiting } = require("../middlewares/rateLimitingMiddleware");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", rateLimiting, login);
router.post("/refresh", refresh);

module.exports = router;