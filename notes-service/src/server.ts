import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = Number(process.env.PORT) || 3002;

app.listen(PORT, () => {
    console.log(`Core service running on http://localhost:${PORT}`);
});
