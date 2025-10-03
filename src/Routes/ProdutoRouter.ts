import {Router} from 'express';
import { ProdutoController } from '../Controller/ProdutoController';

export const ProdutoRouter = (controller:ProdutoController): Router=>{
  const router = Router();
  router.get('/', (req, res) => controller.listar(req,res));
  router.get('/:id', (req, res) => controller.buscarporId(req, res));
  router.post('/', (req, res) => controller.inserir(req, res));
  router.put('/:id', (req, res) => controller.atualizar(req, res));
  router.delete('/:id', (req, res) => controller.deletar(req, res));
  return router
}