"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const RecompensaRepository_1 = require("../../Repository/RecompensaRepository");
(0, globals_1.describe)('RecompensaRepository', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new RecompensaRepository_1.RecompensaRepository();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma nova recompensa com id autoincrement', () => {
            const recompensaData = { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 };
            const resultado = repository.inserir(1, recompensaData);
            (0, globals_1.expect)(resultado).toBeTruthy();
            (0, globals_1.expect)(resultado.id).toBeDefined();
        });
        (0, globals_1.it)('deve incrementar o id para cada nova recompensa', () => {
            const recompensa1 = repository.inserir(1, { nome: 'Recompensa A', descricao: 'Descrição A', produto: { nome: 'Produto A' }, valor_minimo: 50, quantidade_maxima: 5 });
            const recompensa2 = repository.inserir(1, { nome: 'Recompensa B', descricao: 'Descrição B', produto: { nome: 'Produto B' }, valor_minimo: 75, quantidade_maxima: 7 });
            const recompensa3 = repository.inserir(1, { nome: 'Recompensa C', descricao: 'Descrição C', produto: { nome: 'Produto C' }, valor_minimo: 150, quantidade_maxima: 15 });
            (0, globals_1.expect)(recompensa1.id).toBe(1);
            (0, globals_1.expect)(recompensa2.id).toBe(2);
            (0, globals_1.expect)(recompensa3.id).toBe(3);
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar array vazio quando não há recompensas', () => {
            (0, globals_1.expect)(repository.listar()).toEqual([]);
        });
        (0, globals_1.it)('Deve retornar uma lista de recompensas', () => {
            const recompensa1 = repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
            const recompensa2 = repository.inserir(1, { nome: 'Recompensa Y', descricao: 'Descrição Y', produto: { nome: 'Produto Y' }, valor_minimo: 200, quantidade_maxima: 20 });
            const recompensa3 = repository.inserir(1, { nome: 'Recompensa Z', descricao: 'Descrição Z', produto: { nome: 'Produto Z' }, valor_minimo: 300, quantidade_maxima: 30 });
            const lista = repository.listar();
            (0, globals_1.expect)(lista).toHaveLength(3);
            (0, globals_1.expect)(lista).toContainEqual(recompensa1);
            (0, globals_1.expect)(lista).toContainEqual(recompensa2);
            (0, globals_1.expect)(lista).toContainEqual(recompensa3);
        });
    });
    (0, globals_1.describe)('Buscar por Id', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
        });
        (0, globals_1.it)('deve encontrar recompensa por id existente', () => {
            const recompensa = repository.buscarporId(1);
            (0, globals_1.expect)(recompensa).toEqual({
                id: 1,
                nome: 'Recompensa X',
                descricao: 'Descrição X',
                produto: { nome: 'Produto X' },
                valor_minimo: 100,
                quantidade_maxima: 10
            });
        });
        (0, globals_1.it)('deve retornar undefined para id não existente', () => {
            const recompensa = repository.buscarporId(999);
            (0, globals_1.expect)(recompensa).toBeUndefined();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
        });
        (0, globals_1.it)('deve atualizar uma recompensa existente', () => {
            const recompensaAtualizada = repository.atualizar(1, {
                nome: 'Recompensa X Atualizada',
                descricao: 'Descrição X Atualizada',
                produto: { nome: 'Produto X Atualizado' },
                valor_minimo: 150,
                quantidade_maxima: 15
            });
            (0, globals_1.expect)(recompensaAtualizada).toEqual({
                id: 1,
                nome: 'Recompensa X Atualizada',
                descricao: 'Descrição X Atualizada',
                produto: { nome: 'Produto X Atualizado' },
                valor_minimo: 150,
                quantidade_maxima: 15
            });
        });
        (0, globals_1.it)('deve retornar undefined ao tentar atualizar recompensa não existente', () => {
            const resultado = repository.atualizar(999, {
                nome: 'Recompensa Inexistente',
                descricao: 'Descrição Inexistente',
                produto: { nome: 'Produto Inexistente' },
                valor_minimo: 0,
                quantidade_maxima: 0
            });
            (0, globals_1.expect)(resultado).toBeUndefined();
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
            repository.inserir(1, { nome: 'Recompensa Y', descricao: 'Descrição Y', produto: { nome: 'Produto Y' }, valor_minimo: 200, quantidade_maxima: 20 });
        });
        (0, globals_1.it)('deve deletar uma recompensa existente', () => {
            repository.deletar(1);
            const lista = repository.listar();
            (0, globals_1.expect)(lista).toHaveLength(1);
            (0, globals_1.expect)(lista[0].id).toBe(2);
        });
        (0, globals_1.it)('deve retornar false ao tentar deletar recompensa não existente', () => {
            const resultado = repository.deletar(999);
            (0, globals_1.expect)(resultado).toBe(false);
            (0, globals_1.expect)(repository.listar()).toHaveLength(2);
        });
    });
    (0, globals_1.describe)('Buscar por Nome', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Recompensa X', descricao: 'Descrição X', produto: { nome: 'Produto X' }, valor_minimo: 100, quantidade_maxima: 10 });
            repository.inserir(2, { nome: 'Recompensa Y', descricao: 'Descrição Y', produto: { nome: 'Produto Y' }, valor_minimo: 200, quantidade_maxima: 20 });
            repository.inserir(3, { nome: 'Recompensa Z', descricao: 'Descrição Z', produto: { nome: 'Produto Z' }, valor_minimo: 300, quantidade_maxima: 30 });
        });
        (0, globals_1.it)('deve encontrar recompensa por nome existente', () => {
            const recompensa = repository.buscarporNome('Recompensa Y');
            (0, globals_1.expect)(recompensa).toEqual({
                id: 2,
                nome: 'Recompensa Y',
                descricao: 'Descrição Y',
                produto: { nome: 'Produto Y' },
                valor_minimo: 200,
                quantidade_maxima: 20
            });
        });
        (0, globals_1.it)('deve retornar undefined para nome não existente', () => {
            const recompensa = repository.buscarporNome('Recompensa Inexistente');
            (0, globals_1.expect)(recompensa).toBeUndefined();
        });
    });
});
