const express = require("express");
const validateRegister = require("../middlewares/validateRegister");
const { register } = require("../controllers/register.controller");
const { login } = require("../controllers/login.controller");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

module.exports = router;