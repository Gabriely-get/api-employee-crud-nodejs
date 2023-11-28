import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import DepartamentoController from "./DepartamentoController";

class FuncionarioController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const funcionarios = await prisma.funcionario.findMany(
          
          {
            orderBy: { nome: "asc" },
            select: {
              id: true,
              nome: true, 
              salario: true,
              cpf: true,
              cargo: true,
              departamento: {
                select: { id: true }, 
              },
              projetos: {
                select: { id: true }, 
              },
            },
          }
        );
        res.status(200).json(funcionarios);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const funcionario = await prisma.funcionario.findUnique(
          
          {
            where: { id: Number(req.params.id) },
            select: {
              id: true, 
              nome: true,
              salario: true,
              cpf: true,
              cargo: true,
              departamento: {
                select: { id: true },
              },
              projetos: {
                select: { id: true },
              },
            },
          }
        );
        res.status(200).json(funcionario);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        
        const { nome, salario, cpf, cargo, departamentoId } = req.body;
        const novoFuncionario = await prisma.funcionario.create({
          data: {
            nome: nome,
            cpf: cpf, 
            cargo: cargo,
            salario: salario,
            departamentoId: departamentoId
          },
          select: {
            id: true,
            nome: true,
            cpf: true,
            cargo: true,
            salario: true, 
            departamento: true, 
            projetos: true, 
          },
        });
        res.status(200).json(novoFuncionario);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome, cargo, departamentoId, salario, cpf } = req.body;

        const funcionarioAlterado = await prisma.funcionario.update({
          where: { id: Number(req.params.id) },
          data: {
            nome: nome,
            cargo: cargo,
            salario: salario,
            cpf: cpf,
            departamentoId: departamentoId
          },
          select: {
            id: true,
            nome: true,
            cargo: true,
            salario: true,
            cpf: true,
            departamento: true,
            projetos: true
          },
        });
        res.status(200).json(funcionarioAlterado);
      }
     
      async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.funcionario.delete({
          where: { id: Number(req.params.id) },
        });
        res.status(200).json({ excluido: true });
      }

}

export default FuncionarioController;