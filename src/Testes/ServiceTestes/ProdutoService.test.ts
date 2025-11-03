import {describe, expect,it,beforeEach,jest} from '@jest/globals';
import {Produto} from '../../Model/produto';
import {ProdutoService} from '../../Service/ProdutoService'
import { Repository } from 'typeorm';
/*
const produtoMockRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn()
};
/*
describe('ProdutoService', () => {
  let produtoService: ProdutoService;
  let produtoRepository: Repository<Produto>;

  beforeEach(() => {
    produtoRepository = produtoMockRepository as unknown as Repository<Produto>;
    produtoService = new ProdutoService(produtoRepository);
    jest.clearAllMocks();
  });
  describe('inserir', () => {
    it('deve inserir um produto com sucesso', async () => {
      const produto: Produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 }, criador: { id: 1 } };
      produtoMockRepository.save.mockReturnValueOnce(produto);
      const result = await produtoService.inserir(produto);
      expect(result).toEqual(produto);
      expect(produtoMockRepository.save).toHaveBeenCalledWith(produto);
    });
    it('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
      const produto: any = { id: 1, nome: '', descricao: 'Descrição do Produto A', valor_meta: undefined, categoria: { id: 1 } };
      await expect(produtoService.inserir(produto))
        .rejects.toEqual({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
      expect(produtoMockRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é undefined', async () => {
      const produto: any = { id: 1, nome: undefined, descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      await expect(produtoService.inserir(produto))
        .rejects.toEqual({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
      expect(produtoMockRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando nome é null', async () => {
      const produto: any = { id: 1, nome: null, descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      await expect(produtoService.inserir(produto))
        .rejects.toEqual({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
      expect(produtoMockRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('atualizar', () => {
    it('deve atualizar um produto existente', async () => {
      const produto_existente: Produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      const produto_atualizado: Produto = { id: 1, nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } };
      produtoMockRepository.findOne.mockReturnValueOnce(produto_existente);
      produtoMockRepository.save.mockReturnValueOnce(produto_atualizado);
      const result = await produtoService.atualizar(1, produto_atualizado);
      expect(result).toEqual(produto_atualizado);
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(produtoMockRepository.save).toHaveBeenCalledWith(produto_atualizado);
    });
    it('deve lançar erro quando o produto não existe', async () => {
      produtoMockRepository.findOne.mockReturnValueOnce(undefined);
      const produto_atualizado: Produto = { id: 1, nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } };
      await expect(produtoService.atualizar(1, produto_atualizado))
        .rejects.toEqual({ id: 404, msg: "Produto não encontrado" });
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(produtoMockRepository.save).not.toHaveBeenCalled();
    });
    it('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
      const produto_existente: Produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      const produto_atualizado: any = { id: 1, nome: '', descricao: 'Descrição do Produto B', valor_meta: undefined, categoria: { id: 2 } };
      produtoMockRepository.findOne.mockReturnValueOnce(produto_existente);
      await expect(produtoService.atualizar(1, produto_atualizado))
        .rejects.toEqual({ id: 400, msg: "Nome, descrição, preço e categoriaId são obrigatórios" });
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(produtoMockRepository.save).not.toHaveBeenCalled();
    });
  });
  describe('deletar', () => {
    it('deve deletar um produto existente', async () => {
      const produto_existente: Produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 }, criador: { id: 1 }};
      produtoMockRepository.findOne.mockReturnValueOnce(produto_existente);
      const result = await produtoService.deletar(1);
      expect(result).toEqual(produto_existente);
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(produtoMockRepository.remove).toHaveBeenCalledWith(produto_existente);
    });
    it('deve lançar erro quando o produto não existe', async () => {
      produtoMockRepository.findOne.mockReturnValueOnce(null);
      await expect(produtoService.deletar(1))
        .rejects.toEqual({ id: 404, msg: "Produto não encontrado" });
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(produtoMockRepository.remove).not.toHaveBeenCalled();
    });
  });
  describe('listar', () => {
    it('deve listar todos os produtos', async () => {
      const produtos: Produto[] = [
        { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } },
        { id: 2, nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } }
      ];
      produtoMockRepository.find.mockReturnValueOnce(produtos);
      const result = await produtoService.listar();
      expect(result).toEqual(produtos);
      expect(produtoMockRepository.find).toHaveBeenCalled();
    }
    );
  });
  describe('buscarPorId', () => {
    it('deve buscar um produto por ID', async () => {
      const produto: Produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      produtoMockRepository.findOne.mockReturnValueOnce(produto);
      const result = await produtoService.buscarporId(1);
      expect(result).toEqual(produto);
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('deve lançar erro quando o produto não é encontrado', async () => {
      produtoMockRepository.findOne.mockReturnValueOnce(null);
      await expect(produtoService.buscarporId(1))
        .rejects.toEqual({ id: 404, msg: "Produto não encontrado" });
      expect(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
   describe('buscarPorNome', () => {
    it('deve buscar produtos por nome', async () => {
      const produtos: Produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      produtoMockRepository.find.mockReturnValueOnce(produtos);
      const result = await produtoService.buscarporNome('Produto A');
      expect(result).toEqual(produtos);
      expect(produtoMockRepository.find).toHaveBeenCalledWith({ where: { nome: 'Produto A' } });
    });
  }); 
});*/