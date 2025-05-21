import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const criarPlanta = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, local, dataAquisicao, observacoes, fotoUrl } = req.body;

    const novaPlanta = await prisma.planta.create({
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
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar planta." });
  }
};

export const listarPlantas = async (_req: Request, res: Response) => {
  try {
    const plantas = await prisma.planta.findMany({
      include: { cuidados: true }
    });
    res.json(plantas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar plantas." });
  }
};


export const buscarPlanta = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const planta = await prisma.planta.findUnique({
      where: { id: Number(id) },
      include: { cuidados: true }
    });

    if (!planta) {
      return res.status(404).json({ error: "Planta não encontrada." });
    }

    return res.json(planta);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar planta." });
  }
};


export const atualizarPlanta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, tipo, local, dataAquisicao, observacoes, fotoUrl } = req.body;

    const plantaAtualizada = await prisma.planta.update({
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
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar planta." });
  }
};

export const excluirPlanta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.planta.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir planta." });
  }
};
