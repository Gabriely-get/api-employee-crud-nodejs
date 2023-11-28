import { Router, Request, Response } from "express";
import FuncionarioController from "./controllers/FuncionarioController";
import DepartamentoController from "./controllers/DepartamentoController";
import ProjetoController from "./controllers/ProjetoController";

const Roteador = Router();

Roteador.get("/funcionarios", new FuncionarioController().index);
Roteador.get("/funcionarios/:id", new FuncionarioController().show);
Roteador.post("/funcionarios", new FuncionarioController().store);
Roteador.put("/funcionarios/:id", new FuncionarioController().update);
Roteador.delete("/funcionarios/:id", new FuncionarioController().delete);

Roteador.get("/departamentos", new DepartamentoController().index);
Roteador.get("/departamentos/:id", new DepartamentoController().show);
Roteador.post("/departamentos", new DepartamentoController().store);
Roteador.put("/departamentos/:id", new DepartamentoController().update);
Roteador.delete("/departamentos/:id", new DepartamentoController().delete);

Roteador.get("/projetos", new ProjetoController().index);
Roteador.get("/projetos/:id", new ProjetoController().show);
Roteador.post("/projetos", new ProjetoController().store);
Roteador.put("/projetos/:id", new ProjetoController().update);
Roteador.delete("/projetos/:id", new ProjetoController().delete);

export default Roteador;