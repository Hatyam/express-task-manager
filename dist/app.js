"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notes_routes_1 = __importDefault(require("./routes/notes.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/notes", notes_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/deleteUser", users_routes_1.default);
app.use(errorMiddleware_1.default);
app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
});
