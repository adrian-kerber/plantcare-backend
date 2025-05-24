import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("foto"), async (req, res) => {
  console.log("Client ID do Imgur:", process.env.IMGUR_CLIENT_ID);
  try {
    if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

    const imageBase64 = req.file.buffer.toString("base64");

    const response = await axios.post("https://api.imgur.com/3/image", {
      image: imageBase64,
      type: "base64"
    }, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      }
    });

    const imageUrl = response.data.data.link;
    res.json({ imageUrl });
  } catch (err) {
  const error = err as any; // ou use uma interface mais precisa se desejar
  console.error("Erro no upload para Imgur:", error?.response?.data || error?.message || error);
  res.status(500).json({ error: "Erro ao enviar imagem para Imgur" });
}
});

export default router;
