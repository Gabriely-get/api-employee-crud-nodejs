import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class ProjetoController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const projetos = await prisma.projeto.findMany(
          
          {
            orderBy: { nome: "asc" },
            select: {
              id: true,
              nome: true, 
              dataInicio: true,
              dataFim: true,
              funcionarios: {
                select: { id: true }, 
              },
            },
          }
        );
        res.status(200).json(projetos);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const projeto = await prisma.projeto.findUnique(
          
          {
            where: { id: Number(req.params.id) },
            select: {
              id: true, 
              nome: true,
              dataInicio: true,
              dataFim: true,
              funcionarios: {
                select: { id: true },
              },
            },
          }
        );
        res.status(200).json(projeto);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        
        const { nome, dataInicio, dataFim, funcionarios } = req.body;

        let date1 = new Date(dataInicio).toISOString().split('T')[0];
        let date2 = new Date(dataFim).toISOString().split('T')[0];
        const funcIdArray = funcionarios.map( (x:any) => {return {id: x} });

        const novoProjeto = await prisma.projeto.create({
          data: {
            nome: nome,
            dataInicio: date1,
            dataFim: date2,
            funcionarios: { connect: funcIdArray }
          },
          select: {
            id: true, 
            nome: true,
            dataInicio: true,
            dataFim: true,
            funcionarios: {
              select: { id: true },
            },
          },
        });
        res.status(200).json(novoProjeto);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome, dataInicio, dataFim, funcionarios } = req.body;

        let date1 = new Date(dataInicio).toISOString().split('T')[0];
        let date2 = new Date(dataFim).toISOString().split('T')[0];
        
        const funcIdArray = funcionarios.map( (x:any) => {return {id: x} });

        const projetoAlterado = await prisma.projeto.update({
          where: { id: Number(req.params.id) },
          data: {
            nome: nome,
            dataInicio: date1,
            dataFim: date2,
            funcionarios: { connect: funcIdArray }
          },
          select: {
            id: true, 
            nome: true,
            dataInicio: true,
            dataFim: true,
            funcionarios: {
              select: { id: true },
            },
          },
        });
        res.status(200).json(projetoAlterado);
      }
     
      async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.projeto.delete({
          where: { id: Number(req.params.id) },
        });
        res.status(200).json({ excluido: true });
      }

}

export default ProjetoController;