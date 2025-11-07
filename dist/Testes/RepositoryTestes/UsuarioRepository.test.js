"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const UsuarioRepository_1 = require("../../Repository/UsuarioRepository");
(0, globals_1.describe)('UsuarioRepository', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new UsuarioRepository_1.UsuarioRepository();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma novo usuario com id autoincrement', () => {
            const pessoaFisicaData = { nome: 'João Silva', email: 'joao.silva@example.com', senha: 'senha123' };
            const result = repository.inserir(pessoaFisicaData);
            (0, globals_1.expect)(result).toEqual({ ...pessoaFisicaData, id: 1 });
        });
        (0, globals_1.it)('deve incrementar o id para cada nova pessoa fisica', () => {
            const pessoa1 = repository.inserir({ nome: 'Eletrônicos' });
            const pessoa2 = repository.inserir({ nome: 'Livros' });
            const pessoa3 = repository.inserir({ nome: 'Roupas' });
            (0, globals_1.expect)(pessoa1.id).toBe(1);
            (0, globals_1.expect)(pessoa2.id).toBe(2);
            (0, globals_1.expect)(pessoa3.id).toBe(3);
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar array vazio quando não há pessoas físicas', () => {
            (0, globals_1.expect)(repository.listar()).toEqual([]);
        });
        (0, globals_1.it)('Deve retornar uma lista de pessoas físicas', () => {
            const pessoa1 = repository.inserir({ nome: 'João Silva', email: 'joao.silva@example.com', senha: 'senha123' });
            const pessoa2 = repository.inserir({ nome: 'Joana Silva', email: 'joana.silva@example.com', senha: 'senha124' });
            const pessoa3 = repository.inserir({ nome: 'Caio Castro', email: 'Caio.Castro@example.com', senha: 'senha783' });
            const lista = repository.listar();
            (0, globals_1.expect)(lista).toHaveLength(3);
            (0, globals_1.expect)(lista).toContainEqual(pessoa1);
            (0, globals_1.expect)(lista).toContainEqual(pessoa2);
            (0, globals_1.expect)(lista).toContainEqual(pessoa3);
        });
    });
    (0, globals_1.describe)('Buscar por Id', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva', email: 'joao.silva@example.com', senha: 'senha123' }),
                repository.inserir({ nome: 'Joana Grog', email: 'JoanaGrog@example.com', senha: 'senha890' });
        });
    });
    (0, globals_1.it)('deve encontrar pessoa física por id existente', () => {
        const pessoafisica = repository.buscarporId(1);
        (0, globals_1.expect)(pessoafisica).toEqual({
            id: 1,
            nome: 'João Silva',
            email: 'joao.silva@example.com',
            senha: 'senha123'
        });
    });
    (0, globals_1.it)('deve retornar undefined para id não existente', () => {
        const pessoafisica = repository.buscarporId(999);
        (0, globals_1.expect)(pessoafisica).toBeUndefined();
    });
    (0, globals_1.describe)('Buscar por Nome', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva',
                email: 'joao.silva@example.com', senha: 'senha123' }),
                repository.inserir({ nome: 'Joana Grog',
                    email: 'JoanaGrog@example.com', senha: 'senha890' });
        });
        (0, globals_1.it)('deve encontrar pessoa física por nome existente', () => {
            const pessoafisica = repository.buscarporNome('João Silva');
            (0, globals_1.expect)(pessoafisica).toEqual({
                id: 1,
                nome: 'João Silva',
                email: 'joao.silva@example.com',
                senha: 'senha123'
            });
        });
        (0, globals_1.it)('deve retornar undefined para nome não existente', () => {
            const pessoafisica = repository.buscarporNome('Inexistente');
            (0, globals_1.expect)(pessoafisica).toBeUndefined();
        });
    });
    (0, globals_1.describe)('Atualizar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva',
                email: 'joao.silva@example.com', senha: 'senha123' });
            repository.inserir({ nome: 'Thiago Neves', email: 'thiagoneves@example.com', senha: 'senha120' });
        });
        (0, globals_1.it)('Deve Atualizar a pessoa física', () => {
            const result = repository.atualizar(1, { nome: 'João Silva Atualizado', senha: 'senha221' });
            (0, globals_1.expect)(result).toEqual({
                nome: 'João Silva Atualizado', senha: 'senha221'
            });
        });
        (0, globals_1.it)('deve retornar undefined ao tentar atualizar pessoa física não existente', () => {
            const result = repository.atualizar(999, { nome: 'Inexistente' });
            (0, globals_1.expect)(result).toBeUndefined();
        });
        (0, globals_1.it)('não deve afetar outras pessoas ao atualizar', () => {
            repository.atualizar(1, { nome: 'Eletrônicos Atualizado', senha: 'senha221' });
            const outraCategoria = repository.buscarporId(2);
            (0, globals_1.expect)(outraCategoria).toEqual({
                id: 2,
                nome: 'Thiago Neves', email: 'thiagoneves@example.com', senha: 'senha120'
            });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva', email: 'joao.silva@example.com', senha: 'senha123' });
            repository.inserir({ nome: 'Thiago Neves', email: 'thiagoneves@example.com', senha: 'senha120' });
            repository.inserir({ nome: 'Naiara Santos', email: 'naiarasantos@example.com', senha: 'senha330' });
        });
        (0, globals_1.it)('deve deletar pessoa física existente e retornar true', () => {
            const result = repository.deletar(2);
            (0, globals_1.expect)(result).toBe(true);
            (0, globals_1.expect)(repository.listar()).toHaveLength(2);
            (0, globals_1.expect)(repository.buscarporId(2)).toBeUndefined();
        });
        (0, globals_1.it)('deve retornar false ao tentar deletar pessoa física não existente', () => {
            const result = repository.deletar(999);
            (0, globals_1.expect)(result).toBe(false);
            (0, globals_1.expect)(repository.listar()).toHaveLength(3);
        });
        (0, globals_1.it)('deve manter os ids das pessoas físicas restantes após deleção', () => {
            repository.deletar(2);
            const pessoasfisicas = repository.listar();
            (0, globals_1.expect)(pessoasfisicas[0].id).toBe(1);
            (0, globals_1.expect)(pessoasfisicas[1].id).toBe(3);
        });
    });
});
