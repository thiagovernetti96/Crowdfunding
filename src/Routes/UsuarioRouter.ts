import { Router,Request,Response } from "express";
import { UsuarioController } from "../Controller/UsuarioController";

export const UsuarioRouter = (controller:UsuarioController): Router =>{
  const router = Router();
  router.get('/', (req:Request, res:Response) => controller.listar(req,res));
  router.get('/:id', (req:Request, res:Response) => controller.buscarporId(req, res));
  router.get('/nome/:nome', (req:Request, res:Response) => controller.buscarporNome(req, res));
  router.post('/', (req:Request, res:Response) => controller.inserir(req, res)); 
  router.put('/:id', (req:Request, res:Response) => controller.atualizar(req, res));
  router.delete('/:id', (req:Request, res:Response) => controller.deletar(req, res));
  return router
}