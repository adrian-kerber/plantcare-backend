import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const upload = multer();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: "process.env.CLOUDINARY_CLOUD_NAME",
  api_key: "process.env.CLOUDINARY_API_KEY",
  api_secret: "rocess.env.CLOUDINARY_API_SECRET"
});

// Rota para upload de imagem
router.post("/upload", upload.single("foto"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const bufferStream = Readable.from(req.file.buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "plantcare" },
      (error, result) => {
        if (error) {
          console.error("Erro ao enviar para o Cloudinary:", error);
          return res.status(500).json({ error: "Erro ao enviar imagem para Cloudinary" });
        }

        return res.status(200).json({ imageUrl: result?.secure_url });
      }
    );

    bufferStream.pipe(uploadStream);
  } catch (err) {
    console.error("Erro interno no upload:", err);
    return res.status(500).json({ error: "Erro inesperado no servidor" });
  }
});

export default router;
