const express = require("express");
require('dotenv').config()
const app = express();
const cookieParser = require("cookie-parser")
const notesRoutes = require("./routes/notes.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());

app.use(cookieParser());

app.use("/notes", notesRoutes);

app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
});

