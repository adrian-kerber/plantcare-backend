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
exports.excluirPlanta = exports.atualizarPlanta = exports.buscarPlanta = exports.listarPlantas = exports.criarPlanta = void 0;
const client_1 = require("../prisma/client");
const criarPlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, tipo, local, dataAquisicao, observacoes, fotoUrl } = req.body;
        const novaPlanta = yield client_1.prisma.planta.create({
            data: {
                nome,
                tipo,
                local,
                dataAquisicao: new Date(dataAquisicao),
                observacoes,
                fotoUrl
            }
        });
        res.status(201).json(novaPlanta);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar planta." });
    }
});
exports.criarPlanta = criarPlanta;
const listarPlantas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plantas = yield client_1.prisma.planta.findMany({
            include: { cuidados: true }
        });
        res.json(plantas);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar plantas." });
    }
});
exports.listarPlantas = listarPlantas;
const buscarPlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const planta = yield client_1.prisma.planta.findUnique({
            where: { id: Number(id) },
            include: { cuidados: true }
        });
        if (!planta) {
            return res.status(404).json({ error: "Planta não encontrada." });
        }
        return res.json(planta);
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao buscar planta." });
    }
});
exports.buscarPlanta = buscarPlanta;
const atualizarPlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nome, tipo, local, dataAquisicao, observacoes, fotoUrl } = req.body;
        const plantaAtualizada = yield client_1.prisma.planta.update({
            where: { id: Number(id) },
            data: {
                nome,
                tipo,
                local,
                dataAquisicao: new Date(dataAquisicao),
                observacoes,
                fotoUrl
            }
        });
        res.json(plantaAtualizada);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar planta." });
    }
});
exports.atualizarPlanta = atualizarPlanta;
const excluirPlanta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield client_1.prisma.planta.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao excluir planta." });
    }
});
exports.excluirPlanta = excluirPlanta;
