"use strict";
const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { accessMiddleware } = require("../middlewares/accessMiddleware");
const userControl = require("../controllers/userControl.controller");
router.delete("/:id", accessMiddleware, adminMiddleware, userControl.deleteUser);
module.exports = router;
