// src/controllers/ApoioController.ts
import { Request, Response } from "express";
import { ApoioService } from "../Service/ApoioService";

export class ApoioController {
  async criar(req: Request, res: Response) {
    try {
      const { produto, apoiadorPessoaFisica, apoiadorPessoaJuridica, recompensa, valor } = req.body;
      const result = await ApoioService.criarApoio({ produto, apoiadorPessoaFisica, apoiadorPessoaJuridica, recompensa, valor });
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async status(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const apoio = await ApoioService.verificarStatus(Number(id));
      res.json(apoio);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
