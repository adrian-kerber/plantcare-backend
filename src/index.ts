import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import plantaRoutes from "./routes/plantRoutes";
import cuidadoRoutes from "./routes/careRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", plantaRoutes);
app.use("/api", cuidadoRoutes);

app.get("/", (req, res) => {
  res.send("API do PlantCare está funcionando 🌱");
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
