"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const careController_1 = require("../controllers/careController");
const router = (0, express_1.Router)();
router.post("/cuidados", careController_1.criarCuidado);
router.get("/cuidados", careController_1.listarCuidados);
router.put("/cuidados/:id/realizar", (req, res) => {
    (0, careController_1.marcarCuidadoRealizado)(req, res);
});
router.delete("/cuidados/:id", (req, res) => {
    (0, careController_1.excluirCuidado)(req, res);
});
exports.default = router;
