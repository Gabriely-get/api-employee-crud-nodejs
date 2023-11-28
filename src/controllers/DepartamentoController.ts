import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class DepartamentoController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const departamentos = await prisma.departamento.findMany(
          
          {
            orderBy: { nome: "asc" },
            select: {
              id: true,
              nome: true, 
              localizacao: true,
              funcionarios: {
                select: { id: true }, 
              },
            },
          }
        );
        res.status(200).json(departamentos);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const departamento = await prisma.departamento.findUnique(
          
          {
            where: { id: Number(req.params.id) },
            select: {
              id: true, 
              nome: true,
              localizacao: true,
              funcionarios: {
                select: { id: true }, 
              },
            },
          }
        );
        res.status(200).json(departamento);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        
        const { nome, localizacao } = req.body;
        const novoDepartamento = await prisma.departamento.create({
          data: {
            nome: nome,
            localizacao: localizacao
          },
          select: {
            id: true, 
            nome: true,
            localizacao: true,
            funcionarios: {
              select: { id: true }, 
            }
          },
        });
        res.status(200).json(novoDepartamento);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome, localizacao } = req.body;
        let departamentoAlterado = null;

        if (nome != null && localizacao != null) {
          departamentoAlterado = await prisma.departamento.update({
            where: { id: Number(req.params.id) },
            data: {
              nome: nome,
              localizacao: localizacao
            },
            select: {
              id: true, 
              nome: true,
              localizacao: true,
              funcionarios: {
                select: { id: true }, 
              }
            },
          });
        }

        if (nome != null && localizacao == null) {
          departamentoAlterado = await prisma.departamento.update({
            where: { id: Number(req.params.id) },
            data: {
              nome: nome
            },
            select: {
              id: true, 
              nome: true,
              localizacao: true,
              funcionarios: {
                select: { id: true }, 
              }
            },
          });
        }

        if (nome == null && localizacao != null) {
          departamentoAlterado = await prisma.departamento.update({
            where: { id: Number(req.params.id) },
            data: {
              localizacao: localizacao
            },
            select: {
              id: true, 
              nome: true,
              localizacao: true,
              funcionarios: {
                select: { id: true }, 
              }
            },
          });
        }

        
        res.status(200).json(departamentoAlterado);
      }
     
      async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.departamento.delete({
          where: { id: Number(req.params.id) },
        });
        res.status(200).json({ excluido: true });
      }

}

export default DepartamentoController;