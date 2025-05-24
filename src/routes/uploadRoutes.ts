import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Cria o diretório se não existir
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, uploadDir);
  },
  filename: function (_, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("foto"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  // Caminho público que será salvo no banco
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl: filePath });
});

export default router;
