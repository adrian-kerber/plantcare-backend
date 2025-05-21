import { Router } from "express";
import {
  criarPlanta,
  listarPlantas,
  buscarPlanta,
  atualizarPlanta,
  excluirPlanta
} from "../controllers/plantController";
import { Request, Response } from "express";

const router = Router();

router.post("/plantas", criarPlanta);
router.get("/plantas", listarPlantas);
router.get("/plantas/:id", (req: Request, res: Response) => {
  buscarPlanta(req, res);
});
router.put("/plantas/:id", atualizarPlanta);
router.delete("/plantas/:id", excluirPlanta);

export default router;
