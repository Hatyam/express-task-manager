import express from "express";
import notesRoutes from "./routes/notes.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import internalRoutes from "./routes/internal.routes";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/notes", notesRoutes);

app.use("/internal", internalRoutes);

app.use(errorMiddleware);

export default app;
