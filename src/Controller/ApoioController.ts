import { Request, Response } from "express";
import { ApoioService } from "../Service/ApoioService";

export class ApoioController {
  async criar(req: Request, res: Response) {
    try {
      const { produto, apoiador, valor } = req.body;
      console.log(" Criando apoio:", { produto, apoiador, valor });
      
      const result = await ApoioService.criarApoio({ produto, apoiador, valor });
      res.status(201).json(result);
    } catch (err: any) {
      console.error("❌ Erro ao criar apoio:", err);
      res.status(400).json({ 
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }

  async status(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(" Verificando status do apoio:", id);
      
      const resultado = await ApoioService.verificarStatus(Number(id));
      res.json(resultado);
    } catch (err: any) {
      console.error("❌ Erro ao verificar status:", err);
      res.status(400).json({ 
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }

  async simularPagamento(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(" Simulando pagamento para apoio:", id);
      
      const result = await ApoioService.simularPagamento(Number(id));
      res.json(result);
    } catch (err: any) {
      console.error("❌ Erro ao simular pagamento:", err);
      res.status(400).json({ 
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }

  async webhook(req: Request, res: Response) {
    try {
      const webhookData = req.body;
      console.log("Webhook recebido:", webhookData);
      
      const result = await ApoioService.processarWebhook(webhookData);
      res.json(result);
    } catch (err: any) {
      console.error("❌ Erro no webhook:", err);
      res.status(400).json({ 
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }

  // Endpoint de diagnóstico
  async testarConexao(req: Request, res: Response) {
    try {
      console.log("🧪 Testando conexão com Abacate Pay...");
      const result = await ApoioService.testarConexaoAbacatePay();
      res.json(result);
    } catch (err: any) {
      console.error("❌ Erro no teste de conexão:", err);
      res.status(500).json({ 
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  }
}