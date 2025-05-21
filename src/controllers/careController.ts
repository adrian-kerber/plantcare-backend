import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const criarCuidado = async (req: Request, res: Response) => {
  try {
    const { tipo, dataProgramada, plantaId } = req.body;

    const novoCuidado = await prisma.cuidado.create({
      data: {
        tipo,
        dataProgramada: new Date(dataProgramada),
        plantaId,
      },
    });

    res.status(201).json(novoCuidado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cuidado." });
  }
};

export const listarCuidados = async (_req: Request, res: Response) => {
  try {
    const cuidados = await prisma.cuidado.findMany({
      include: { planta: true }
    });

    res.json(cuidados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar cuidados." });
  }
};

export const marcarCuidadoRealizado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cuidadoAtualizado = await prisma.cuidado.update({
      where: { id: Number(id) },
      data: {
        realizado: true,
        dataRealizacao: new Date()
      }
    });

    res.json(cuidadoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cuidado." });
  }
};

export const excluirCuidado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.cuidado.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cuidado." });
  }
};
