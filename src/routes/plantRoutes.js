"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plantController_1 = require("../controllers/plantController");
const router = (0, express_1.Router)();
router.post("/plantas", plantController_1.criarPlanta);
router.get("/plantas", plantController_1.listarPlantas);
router.get("/plantas/:id", (req, res) => {
    (0, plantController_1.buscarPlanta)(req, res);
});
router.put("/plantas/:id", plantController_1.atualizarPlanta);
router.delete("/plantas/:id", plantController_1.excluirPlanta);
exports.default = router;
