import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import usersRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/auth", authRoutes);

app.use("/users", usersRoutes);

app.use(errorMiddleware);

export default app;
