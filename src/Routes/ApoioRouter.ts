import {Router,Request,Response} from "express"
import { ApoioController } from "../Controller/ApoioController"
import { TokenMiddleware } from "../Middleware/TokenMiddleware";

export const ApoioRouter = (
  controller: ApoioController, 
  tokenMiddleware: TokenMiddleware
): Router => {
  const router = Router();
  
  // Aplica o middleware apenas nas rotas que precisam de autenticação
  router.post('/apoio',  (req: Request, res: Response) => controller.criar(req,res));
  router.get('/apoio/:id/status',(req: Request, res: Response) => controller.status(req, res));
  router.post("/apoio/:id/simular", (req: Request, res: Response) => controller.simularPagamento(req, res));
  router.post('/apoio/webhook',(req:Request,res:Response)=>controller.webhook(req,res))

  // Webhook não precisa de autenticação
  //router.post("/webhook/pix", (req, res) => controller.webhook(req, res));

  
  
  return router
}