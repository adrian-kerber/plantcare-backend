"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const plantRoutes_1 = __importDefault(require("./routes/plantRoutes"));
const careRoutes_1 = __importDefault(require("./routes/careRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", plantRoutes_1.default);
app.use("/api", careRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API do PlantCare está funcionando 🌱");
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
