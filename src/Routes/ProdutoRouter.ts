import { Router,Request,Response } from 'express';
import { ProdutoController } from '../Controller/ProdutoController';

export const ProdutoRouter = (controller: ProdutoController): Router => {
  const router = Router();
  
  
  // Rotas COM arrecadação 
  router.get('/com-arrecadacao', (req: Request, res: Response) => controller.listarComArrecadacao(req, res));
  router.get('/criador/:nome/com-arrecadacao', (req: Request, res: Response) => controller.buscarPorCriadorComArrecadacao(req, res));
  router.get('/:id/com-arrecadacao', (req: Request, res: Response) => controller.obterPorIdComArrecadacao(req, res));

  // Rotas normais 
  router.get('/', (req: Request, res: Response) => controller.listar(req, res));
  router.get('/criador/:nomeCriador', (req: Request, res: Response) => controller.buscarPorCriador(req, res));
  router.get('/nome/:nome', (req: Request, res: Response) => controller.buscarporNome(req, res));
  router.get('/categoria/:nomeCategoria',(req:Request,res:Response)=>controller.buscarPorCategoria(req,res))
  router.get('/:id', (req: Request, res: Response) => controller.buscarporId(req, res));
  
  // Rotas de upload de imagem
  router.post('/', 
    controller.uploadImage,
    (req: Request, res: Response) => controller.inserir(req, res)
  );
  router.put('/:id', 
    controller.uploadImage,
    (req: Request, res: Response) => controller.atualizar(req, res)
  );
  router.delete('/:id', (req: Request, res: Response) => controller.deletar(req, res));

  return router;
};