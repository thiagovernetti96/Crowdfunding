"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ProdutoRepository_1 = require("../../Repository/ProdutoRepository");
(0, globals_1.describe)('ProdutoRepository', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new ProdutoRepository_1.ProdutoRepository();
    });
    (0, globals_1.describe)('adicionar', () => {
        (0, globals_1.it)('deve adicionar um novo produto com id autoincrement', () => {
            const produtoData = { nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            const produto = repository.adicionar(produtoData);
            (0, globals_1.expect)(produto).toEqual({ id: 1, ...produtoData });
        });
        (0, globals_1.it)('deve incrementar o id para cada novo produto', () => {
            const produto1 = repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
            const produto2 = repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
            (0, globals_1.expect)(produto1.id).toBe((1));
            (0, globals_1.expect)(produto2.id).toBe((2));
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar todos os produtos', () => {
            const produto1 = repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
            const produto2 = repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
            const produtos = repository.listar();
            (0, globals_1.expect)(produtos).toEqual([produto1, produto2]);
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.beforeEach)(() => {
            repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
            repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
        });
        (0, globals_1.it)('deve encontrar produto por id existente', () => {
            const produto = repository.buscarporId(1);
            (0, globals_1.expect)(produto).toEqual({
                id: 1,
                nome: 'Produto A',
                descricao: 'Descrição do Produto A',
                valor_meta: 100.0,
                categoria: { id: 1 }
            });
        });
        (0, globals_1.it)('deve retornar undefined para id não existente', () => {
            const produto = repository.buscarporId(999);
            (0, globals_1.expect)(produto).toBeUndefined();
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.beforeEach)(() => {
            repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 }, });
            repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
            repository.adicionar({ nome: 'Produto A Plus', descricao: 'Descrição do Produto A Plus', valor_meta: 200.0, categoria: { id: 1 } });
        });
        (0, globals_1.it)('deve encontrar produtos por nome existente', () => {
            const produtos = repository.buscarporNome('Produto A');
            (0, globals_1.expect)(produtos).toEqual({
                id: 1,
                nome: 'Produto A',
                descricao: 'Descrição do Produto A',
                valor_meta: 100.0,
                categoria: { id: 1 }
            });
        });
        (0, globals_1.it)('deve retornar array vazio para nome não existente', () => {
            const produtos = repository.buscarporNome('Produto Inexistente');
            (0, globals_1.expect)(produtos).toBeUndefined();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
            repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
        });
        (0, globals_1.it)('deve atualizar um produto existente', () => {
            const produtoAtualizado = repository.atualizar(1, { nome: 'Produto A Atualizado', valor_meta: 120.0, categoria: { id: 1 }, descricao: 'Descrição do Produto A Atualizada' });
            (0, globals_1.expect)(produtoAtualizado).toEqual({
                id: 1,
                nome: 'Produto A Atualizado',
                descricao: 'Descrição do Produto A Atualizada',
                valor_meta: 120.0,
                categoria: { id: 1 }
            });
        });
        (0, globals_1.it)('deve retornar undefined ao tentar atualizar um produto inexistente', () => {
            const produtoAtualizado = repository.atualizar(999, { nome: 'Produto Inexistente' });
            (0, globals_1.expect)(produtoAtualizado).toBeUndefined();
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.adicionar({ nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } });
            repository.adicionar({ nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } });
        });
        (0, globals_1.it)('deve deletar um produto existente', () => {
            const resultado = repository.deletar(1);
            (0, globals_1.expect)(resultado).toBe(true);
            const produto = repository.buscarporId(1);
            (0, globals_1.expect)(produto).toBeUndefined();
        });
        (0, globals_1.it)('deve retornar false ao tentar deletar um produto inexistente', () => {
            const resultado = repository.deletar(999);
            (0, globals_1.expect)(resultado).toBe(false);
        });
    });
});
