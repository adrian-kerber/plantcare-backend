"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCuidado = exports.marcarCuidadoRealizado = exports.listarCuidados = exports.criarCuidado = void 0;
const client_1 = require("../prisma/client");
const criarCuidado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo, dataProgramada, plantaId } = req.body;
        const novoCuidado = yield client_1.prisma.cuidado.create({
            data: {
                tipo,
                dataProgramada: new Date(dataProgramada),
                plantaId,
            },
        });
        res.status(201).json(novoCuidado);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar cuidado." });
    }
});
exports.criarCuidado = criarCuidado;
const listarCuidados = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuidados = yield client_1.prisma.cuidado.findMany({
            include: { planta: true }
        });
        res.json(cuidados);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar cuidados." });
    }
});
exports.listarCuidados = listarCuidados;
const marcarCuidadoRealizado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cuidadoAtualizado = yield client_1.prisma.cuidado.update({
            where: { id: Number(id) },
            data: {
                realizado: true,
                dataRealizacao: new Date()
            }
        });
        res.json(cuidadoAtualizado);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar cuidado." });
    }
});
exports.marcarCuidadoRealizado = marcarCuidadoRealizado;
const excluirCuidado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield client_1.prisma.cuidado.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao excluir cuidado." });
    }
});
exports.excluirCuidado = excluirCuidado;
