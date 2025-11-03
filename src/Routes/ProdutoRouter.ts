import { Router } from 'express';
import { ProdutoController } from '../Controller/ProdutoController';

export const ProdutoRouter = (controller: ProdutoController): Router => {
  const router = Router();
  
  // 🔄 REORGANIZEI A ORDEM - rotas mais específicas primeiro!
  
  // Rotas COM arrecadação (mais específicas)
  router.get('/com-arrecadacao', (req, res) => controller.listarComArrecadacao(req, res));
  router.get('/criador/:nome/com-arrecadacao', (req, res) => controller.buscarPorCriadorComArrecadacao(req, res));
  router.get('/:id/com-arrecadacao', (req, res) => controller.obterPorIdComArrecadacao(req, res));
  
  // Rotas normais (menos específicas)
  router.get('/', (req, res) => controller.listar(req, res));
  router.get('/criador/:nomeCriador', (req, res) => controller.buscarPorCriador(req, res)); // REMOVI A DUPLICATA
  router.get('/nome/:nome', (req, res) => controller.buscarporNome(req, res));
  router.get('/:id', (req, res) => controller.buscarporId(req, res));
  
  // Rotas de escrita
  router.post('/', 
    controller.uploadImage,
    (req, res) => controller.inserir(req, res)
  );
  router.put('/:id', 
    controller.uploadImage,
    (req, res) => controller.atualizar(req, res)
  );
  router.delete('/:id', (req, res) => controller.deletar(req, res));

  return router;
};