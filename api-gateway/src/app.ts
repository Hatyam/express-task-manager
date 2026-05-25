import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

app.listen(3000, () => {
    console.log("API Gateway running on port 3000");
});
