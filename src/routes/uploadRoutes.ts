import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("foto"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  try {
    const imgurResponse = await axios.post("https://api.imgur.com/3/image", {
      image: req.file.buffer.toString("base64"),
      type: "base64",
    }, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
    });

    const imageUrl = imgurResponse.data.data.link;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Erro ao fazer upload para Imgur:", error);
    return res.status(500).json({ error: "Erro ao enviar imagem para Imgur" });
  }
});

export default router;
