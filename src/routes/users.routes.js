const express = require("express");
const router = express.Router();

const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { accessMiddleware } = require("../middlewares/accessMiddleware");
const userControl = require("../controllers/userControl.controller");

router.delete("/:id", accessMiddleware, adminMiddleware, userControl.deleteUser);

router.get("/", accessMiddleware, adminMiddleware, userControl.getAllUsers);

router.post("/recoverUser/:id", accessMiddleware, adminMiddleware, userControl.recoverUser);

module.exports = router