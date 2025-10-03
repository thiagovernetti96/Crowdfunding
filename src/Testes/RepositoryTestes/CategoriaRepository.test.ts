import {describe, expect,it,beforeEach} from '@jest/globals';

import { Categoria } from '../../Model/categoria'
import { CategoriaRepository } from '../../Repository/CategoriaRepository';

describe('CategoriaRepository', () => {
  let repository: CategoriaRepository;

  beforeEach(() => {
    repository = new CategoriaRepository();
  });

  describe('inserir', () => {
    it('deve inserir uma nova categoria com id autoincrement', () => {
      const categoriaData = { nome: 'Eletrônicos' };
      const result = repository.inserir(categoriaData);

      expect(result).toEqual({
        id: 1,
        nome: 'Eletrônicos'
      });
    });

    it('deve incrementar o id para cada nova categoria', () => {
      const categoria1 = repository.inserir({ nome: 'Eletrônicos' });
      const categoria2 = repository.inserir({ nome: 'Livros' });
      const categoria3 = repository.inserir({ nome: 'Roupas' });

      expect(categoria1.id).toBe(1);
      expect(categoria2.id).toBe(2);
      expect(categoria3.id).toBe(3);
    });
  });

  describe('listar', () => {
    it('deve retornar array vazio quando não há categorias', () => {
      expect(repository.listar()).toEqual([]);
    });

    it('deve retornar todas as categorias inseridas', () => {
      const categoria1 = repository.inserir({ nome: 'Eletrônicos' });
      const categoria2 = repository.inserir({ nome: 'Livros' });

      const categorias = repository.listar();

      expect(categorias).toHaveLength(2);
      expect(categorias).toContainEqual(categoria1);
      expect(categorias).toContainEqual(categoria2);
    });
  });

  describe('buscarporId', () => {
    beforeEach(() => {
      repository.inserir({ nome: 'Eletrônicos' });
      repository.inserir({ nome: 'Livros' });
    });

    it('deve encontrar categoria por id existente', () => {
      const categoria = repository.buscarporId(1);
      
      expect(categoria).toEqual({
        id: 1,
        nome: 'Eletrônicos'
      });
    });

    it('deve retornar undefined para id não existente', () => {
      const categoria = repository.buscarporId(999);
      
      expect(categoria).toBeUndefined();
    });
  });

  describe('buscarporNome', () => {
    beforeEach(() => {
      repository.inserir({ nome: 'Eletrônicos' });
      repository.inserir({ nome: 'Livros' });
    });

    it('deve encontrar categoria por nome existente', () => {
      const categoria = repository.buscarporNome('Eletrônicos');
      
      expect(categoria).toEqual({
        id: 1,
        nome: 'Eletrônicos'
      });
    });

    it('deve retornar undefined para nome não existente', () => {
      const categoria = repository.buscarporNome('Inexistente');
      
      expect(categoria).toBeUndefined();
    });

    it('deve ser case sensitive na busca por nome', () => {
      const categoria = repository.buscarporNome('eletrônicos');
      
      expect(categoria).toBeUndefined();
    });
  });

  describe('atualizar', () => {
    beforeEach(() => {
      repository.inserir({ nome: 'Eletrônicos' });
      repository.inserir({ nome: 'Livros' });
    });

    it('deve atualizar categoria existente', () => {
      const result = repository.atualizar(1, { nome: 'Eletrônicos Atualizado' });
      
      expect(result).toEqual({
        id: 1,
        nome: 'Eletrônicos Atualizado'
      });

    });

    it('deve retornar undefined ao tentar atualizar categoria não existente', () => {
      const result = repository.atualizar(999, { nome: 'Inexistente' });
      
      expect(result).toBeUndefined();
    });

    it('não deve afetar outras categorias ao atualizar', () => {
      repository.atualizar(1, { nome: 'Eletrônicos Atualizado' });
      
      const outraCategoria = repository.buscarporId(2);
      expect(outraCategoria).toEqual({
        id: 2,
        nome: 'Livros'
      });
    });
  });

  describe('deletar', () => {
    beforeEach(() => {
      repository.inserir({ nome: 'Eletrônicos' });
      repository.inserir({ nome: 'Livros' });
      repository.inserir({ nome: 'Roupas' });
    });

    it('deve deletar categoria existente e retornar true', () => {
      const result = repository.deletar(2);
      
      expect(result).toBe(true);
      expect(repository.listar()).toHaveLength(2);
      expect(repository.buscarporId(2)).toBeUndefined();
    });

    it('deve retornar false ao tentar deletar categoria não existente', () => {
      const result = repository.deletar(999);
      
      expect(result).toBe(false);
      expect(repository.listar()).toHaveLength(3);
    });

    it('deve manter os ids das categorias restantes após deleção', () => {
      repository.deletar(2);
      
      const categorias = repository.listar();
      expect(categorias[0].id).toBe(1);
      expect(categorias[1].id).toBe(3);
    });
  });
});