import { Router, Request, Response } from "express";
import {
  criarCuidado,
  listarCuidados,
  marcarCuidadoRealizado,
  excluirCuidado,
} from "../controllers/careController";

const router = Router();

router.post("/cuidados", criarCuidado);
router.get("/cuidados", listarCuidados);
router.put("/cuidados/:id/realizar", (req: Request, res: Response) => {
  marcarCuidadoRealizado(req, res);
});
router.delete("/cuidados/:id", (req: Request, res: Response) => {
  excluirCuidado(req, res);
});

export default router;
