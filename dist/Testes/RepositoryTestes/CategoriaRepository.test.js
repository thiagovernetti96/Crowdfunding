"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const CategoriaRepository_1 = require("../../Repository/CategoriaRepository");
(0, globals_1.describe)('CategoriaRepository', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new CategoriaRepository_1.CategoriaRepository();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma nova categoria com id autoincrement', () => {
            const categoriaData = { nome: 'Eletrônicos' };
            const result = repository.inserir(categoriaData);
            (0, globals_1.expect)(result).toEqual({
                id: 1,
                nome: 'Eletrônicos'
            });
        });
        (0, globals_1.it)('deve incrementar o id para cada nova categoria', () => {
            const categoria1 = repository.inserir({ nome: 'Eletrônicos' });
            const categoria2 = repository.inserir({ nome: 'Livros' });
            const categoria3 = repository.inserir({ nome: 'Roupas' });
            (0, globals_1.expect)(categoria1.id).toBe(1);
            (0, globals_1.expect)(categoria2.id).toBe(2);
            (0, globals_1.expect)(categoria3.id).toBe(3);
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar array vazio quando não há categorias', () => {
            (0, globals_1.expect)(repository.listar()).toEqual([]);
        });
        (0, globals_1.it)('deve retornar todas as categorias inseridas', () => {
            const categoria1 = repository.inserir({ nome: 'Eletrônicos' });
            const categoria2 = repository.inserir({ nome: 'Livros' });
            const categorias = repository.listar();
            (0, globals_1.expect)(categorias).toHaveLength(2);
            (0, globals_1.expect)(categorias).toContainEqual(categoria1);
            (0, globals_1.expect)(categorias).toContainEqual(categoria2);
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'Eletrônicos' });
            repository.inserir({ nome: 'Livros' });
        });
        (0, globals_1.it)('deve encontrar categoria por id existente', () => {
            const categoria = repository.buscarporId(1);
            (0, globals_1.expect)(categoria).toEqual({
                id: 1,
                nome: 'Eletrônicos'
            });
        });
        (0, globals_1.it)('deve retornar undefined para id não existente', () => {
            const categoria = repository.buscarporId(999);
            (0, globals_1.expect)(categoria).toBeUndefined();
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'Eletrônicos' });
            repository.inserir({ nome: 'Livros' });
        });
        (0, globals_1.it)('deve encontrar categoria por nome existente', () => {
            const categoria = repository.buscarporNome('Eletrônicos');
            (0, globals_1.expect)(categoria).toEqual({
                id: 1,
                nome: 'Eletrônicos'
            });
        });
        (0, globals_1.it)('deve retornar undefined para nome não existente', () => {
            const categoria = repository.buscarporNome('Inexistente');
            (0, globals_1.expect)(categoria).toBeUndefined();
        });
        (0, globals_1.it)('deve ser case sensitive na busca por nome', () => {
            const categoria = repository.buscarporNome('eletrônicos');
            (0, globals_1.expect)(categoria).toBeUndefined();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'Eletrônicos' });
            repository.inserir({ nome: 'Livros' });
        });
        (0, globals_1.it)('deve atualizar categoria existente', () => {
            const result = repository.atualizar(1, { nome: 'Eletrônicos Atualizado' });
            (0, globals_1.expect)(result).toEqual({
                id: 1,
                nome: 'Eletrônicos Atualizado'
            });
        });
        (0, globals_1.it)('deve retornar undefined ao tentar atualizar categoria não existente', () => {
            const result = repository.atualizar(999, { nome: 'Inexistente' });
            (0, globals_1.expect)(result).toBeUndefined();
        });
        (0, globals_1.it)('não deve afetar outras categorias ao atualizar', () => {
            repository.atualizar(1, { nome: 'Eletrônicos Atualizado' });
            const outraCategoria = repository.buscarporId(2);
            (0, globals_1.expect)(outraCategoria).toEqual({
                id: 2,
                nome: 'Livros'
            });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'Eletrônicos' });
            repository.inserir({ nome: 'Livros' });
            repository.inserir({ nome: 'Roupas' });
        });
        (0, globals_1.it)('deve deletar categoria existente e retornar true', () => {
            const result = repository.deletar(2);
            (0, globals_1.expect)(result).toBe(true);
            (0, globals_1.expect)(repository.listar()).toHaveLength(2);
            (0, globals_1.expect)(repository.buscarporId(2)).toBeUndefined();
        });
        (0, globals_1.it)('deve retornar false ao tentar deletar categoria não existente', () => {
            const result = repository.deletar(999);
            (0, globals_1.expect)(result).toBe(false);
            (0, globals_1.expect)(repository.listar()).toHaveLength(3);
        });
        (0, globals_1.it)('deve manter os ids das categorias restantes após deleção', () => {
            repository.deletar(2);
            const categorias = repository.listar();
            (0, globals_1.expect)(categorias[0].id).toBe(1);
            (0, globals_1.expect)(categorias[1].id).toBe(3);
        });
    });
});
