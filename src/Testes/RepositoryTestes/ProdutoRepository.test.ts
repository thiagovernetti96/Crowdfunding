/*import {describe, expect,it,beforeEach} from '@jest/globals';
import { Produto } from '../../Model/produto'
import { ProdutoRepository } from '../../Repository/ProdutoRepository';

/*describe('ProdutoRepository', () => {
  let repository: ProdutoRepository;
  beforeEach(() => {
    repository = new ProdutoRepository();
  });
  /**describe('adicionar', () => {
    it('deve adicionar um novo produto com id autoincrement', () => {
      const produtoData = { nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
      const produto = repository.adicionar(produtoData);
      expect(produto).toEqual({ id: 1, ...produtoData });
    });
    /*it('deve incrementar o id para cada novo produto', () => {
      const produto1 = repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
      const produto2 = repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
      expect(produto1.id).toBe((1));
      expect(produto2.id).toBe((2));
    });
  });*/

  /*describe('listar', () => {
    it('deve listar todos os produtos', () => {
      const produto1 = repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
      const produto2 = repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
      const produtos = repository.listar();
      expect(produtos).toEqual([produto1, produto2]);
    });
  });

  describe('buscarporId', () => {
    beforeEach(() => {
      repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
      repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
    });
    it('deve encontrar produto por id existente', () => {
      const produto = repository.buscarporId(1);
      expect(produto).toEqual({
        id: 1,
        nome: 'Produto A',
        descricao: 'Descrição do Produto A',
        valor_meta: 100.0,
        categoria: { id: 1 }
      });
    });
    it('deve retornar undefined para id não existente', () => {
      const produto = repository.buscarporId(999);
      expect(produto).toBeUndefined();
    });
  });

  describe('buscarporNome', () => {
    beforeEach(() => {
      repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 }, });
      repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
      repository.adicionar({ nome: 'Produto A Plus', descricao: 'Descrição do Produto A Plus', valor_meta: 200.0, categoria: { id: 1 } });
    });
    it('deve encontrar produtos por nome existente', () => {
      const produtos = repository.buscarporNome('Produto A');
      expect(produtos).toEqual(
        {
          id: 1,
          nome: 'Produto A',
          descricao: 'Descrição do Produto A',
          valor_meta: 100.0,
          categoria: { id: 1 }
        },
      );
    });
    it('deve retornar array vazio para nome não existente', () => {
      const produtos = repository.buscarporNome('Produto Inexistente');
      expect(produtos).toBeUndefined();
    });
  });

  describe('atualizar', () => {
    beforeEach(() => {
      repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
      repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
    });
    it('deve atualizar um produto existente', () => {
      const produtoAtualizado = repository.atualizar(1, { nome: 'Produto A Atualizado', valor_meta: 120.0, categoria: { id: 1 },descricao: 'Descrição do Produto A Atualizada' });
      expect(produtoAtualizado).toEqual({
        id: 1,
        nome: 'Produto A Atualizado',
        descricao: 'Descrição do Produto A Atualizada',
        valor_meta: 120.0,
        categoria: { id: 1 }
      });
    });
    it('deve retornar undefined ao tentar atualizar um produto inexistente', () => {
      const produtoAtualizado = repository.atualizar(999, { nome: 'Produto Inexistente' });
      expect(produtoAtualizado).toBeUndefined();
    });
  });
  describe('deletar', () => {
    beforeEach(() => {
      repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
      repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
    });
    it('deve deletar um produto existente', () => {
      const resultado = repository.deletar(1);
      expect(resultado).toBe(true);
      const produto = repository.buscarporId(1);
      expect(produto).toBeUndefined();
    });
    it('deve retornar false ao tentar deletar um produto inexistente', () => {
      const resultado = repository.deletar(999);
      expect(resultado).toBe(false);
    });
  });
});*/