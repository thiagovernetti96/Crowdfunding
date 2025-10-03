"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PessoaJuridicaRepository_1 = require("../../Repository/PessoaJuridicaRepository");
(0, globals_1.describe)('PessoaJuridicaRepository', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new PessoaJuridicaRepository_1.PessoaJuridicaRepository();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma nova pessoa jurídica com id autoincrement', () => {
            const pessoaJuridicaData = { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', };
            const resultado = repository.inserir(1, pessoaJuridicaData);
            (0, globals_1.expect)(resultado).toBeTruthy();
            (0, globals_1.expect)(resultado.id).toBeDefined();
        });
        (0, globals_1.it)('deve incrementar o id para cada nova pessoa jurídica', () => {
            const pessoa1 = repository.inserir(1, { nome: 'Empresa A', cnpj: '12.345.678/0001-00', email: 'empresa.a@example.com', senha: 'senha123', });
            const pessoa2 = repository.inserir(2, { nome: 'Empresa B', cnpj: '98.765.432/0001-00', email: 'empresa.b@example.com', senha: 'senha123', });
            const pessoa3 = repository.inserir(3, { nome: 'Empresa C', cnpj: '11.222.333/0001-00', email: 'empresa.c@example.com', senha: 'senha123', });
            (0, globals_1.expect)(pessoa1.id).toBe(1);
            (0, globals_1.expect)(pessoa2.id).toBe(2);
            (0, globals_1.expect)(pessoa3.id).toBe(3);
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar array vazio quando não há pessoas jurídicas', () => {
            (0, globals_1.expect)(repository.listar()).toEqual([]);
        });
        (0, globals_1.it)('Deve retornar uma lista de pessoas jurídicas', () => {
            const pessoa1 = repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', });
            const pessoa2 = repository.inserir(2, { nome: 'Empresa Y', cnpj: '98.765.432/0001-00', email: 'empresa.y@example.com', senha: 'senha123', });
            const pessoa3 = repository.inserir(3, { nome: 'Empresa Z', cnpj: '11.222.333/0001-00', email: 'empresa.z@example.com', senha: 'senha123', });
            const lista = repository.listar();
            (0, globals_1.expect)(lista).toHaveLength(3);
            (0, globals_1.expect)(lista).toContainEqual(pessoa1);
            (0, globals_1.expect)(lista).toContainEqual(pessoa2);
            (0, globals_1.expect)(lista).toContainEqual(pessoa3);
        });
    });
    (0, globals_1.describe)('Buscar por Id', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', });
        });
        (0, globals_1.it)('deve encontrar pessoa jurídica por id existente', () => {
            const pessoajuridica = repository.buscarporId(1);
            (0, globals_1.expect)(pessoajuridica).toEqual({
                id: 1,
                nome: 'Empresa X', cnpj: '12.345.678/0001-00',
                email: 'empresa.x@example.com', senha: 'senha123',
            });
        });
        (0, globals_1.it)('deve retornar undefined para id não existente', () => {
            const pessoajuridica = repository.buscarporId(999);
            (0, globals_1.expect)(pessoajuridica).toBeUndefined();
        });
    });
    (0, globals_1.describe)('Buscar por Nome', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', });
        });
        (0, globals_1.it)('deve encontrar pessoa jurídica por nome existente', () => {
            const pessoajuridica = repository.buscarporNome('Empresa X');
            (0, globals_1.expect)(pessoajuridica).toEqual({
                id: 1,
                nome: 'Empresa X', cnpj: '12.345.678/0001-00',
                email: 'empresa.x@example.com', senha: 'senha123',
            });
        });
        (0, globals_1.it)('deve retornar undefined para nome não existente', () => {
            const pessoajuridica = repository.buscarporNome('Empresa Y');
            (0, globals_1.expect)(pessoajuridica).toBeUndefined();
        });
    });
    (0, globals_1.describe)('Atualizar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', });
        });
        (0, globals_1.it)('deve atualizar uma pessoa jurídica existente', () => {
            const resultado = repository.atualizar(1, { nome: 'Empresa X Atualizada', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', });
            (0, globals_1.expect)(resultado).toBeTruthy();
            (0, globals_1.expect)(resultado).toEqual({
                id: 1,
                nome: 'Empresa X Atualizada',
                cnpj: '12.345.678/0001-00',
                email: 'empresa.x@example.com', senha: 'senha123',
            });
        });
        (0, globals_1.it)('deve retornar undefined ao tentar atualizar uma pessoa jurídica não existente', () => {
            const resultado = repository.atualizar(999, { nome: 'Empresa Inexistente', cnpj: '00.000.000/0001-00', email: 'empresa.inexistente@example.com', senha: 'senha123', });
            (0, globals_1.expect)(resultado).toBeUndefined();
        });
    });
    (0, globals_1.describe)('Deletar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir(1, { nome: 'Empresa X', cnpj: '12.345.678/0001-00', email: 'empresa.x@example.com', senha: 'senha123', });
            repository.inserir(2, { nome: 'Empresa Y', cnpj: '98.765.432/0001-00', email: 'empresa.y@example.com', senha: 'senha123', });
        });
        (0, globals_1.it)('deve deletar uma pessoa jurídica existente', () => {
            const resultado = repository.deletar(1);
            (0, globals_1.expect)(resultado).toBeTruthy();
            (0, globals_1.expect)(repository.buscarporId(1)).toBeUndefined();
        });
        (0, globals_1.it)('deve retornar false ao tentar deletar uma pessoa jurídica não existente', () => {
            const resultado = repository.deletar(999);
            (0, globals_1.expect)(resultado).toBe(false);
            (0, globals_1.expect)(repository.listar()).toHaveLength(2);
        });
    });
});
