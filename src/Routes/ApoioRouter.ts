import {Router} from "express"
import { ApoioController } from "../Controller/ApoioController"
import { TokenMiddleware } from "../Middleware/TokenMiddleware";

export const ApoioRouter = (
  controller: ApoioController, 
  tokenMiddleware: TokenMiddleware
): Router => {
  const router = Router();
  
  // Aplica o middleware apenas nas rotas que precisam de autenticação
  router.post('/',  (req, res) => controller.criar(req,res));
  router.get('/:id/status',(req, res) => controller.status(req, res));
  router.post("/:id/simular", (req, res) => controller.simularPagamento(req, res));
  
  // Webhook não precisa de autenticação
  router.post("/webhook/pix", (req, res) => controller.webhook(req, res));

  
  
  return router
}