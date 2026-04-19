import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import cookieParser from "cookie-parser";
import notesRoutes from "./routes/notes.routes";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import usersRoutes from "./routes/users.routes";
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(cookieParser());

app.use("/notes", notesRoutes);

app.use("/auth", authRoutes);

app.use("/users", usersRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Сервер запущен на http://localhost:3000");
});

