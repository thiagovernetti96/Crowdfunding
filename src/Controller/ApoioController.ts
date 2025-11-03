// src/controllers/ApoioController.ts
import { Request, Response } from "express";
import { ApoioService } from "../Service/ApoioService";

export class ApoioController {
  async criar(req: Request, res: Response) {
    try {
      const { produto, apoiador, valor } = req.body;
      const result = await ApoioService.criarApoio({ produto, apoiador, valor });
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

  async simularPagamento(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ApoioService.simularPagamento(Number(id));
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async webhook(req: Request, res: Response) {
    try {
      const webhookData = req.body;
      const result = await ApoioService.processarWebhook(webhookData);
      res.json(result);
    } catch (err: any) {
      console.error("Erro no webhook:", err);
      res.status(400).json({ error: err.message });
    }
  }

  
}