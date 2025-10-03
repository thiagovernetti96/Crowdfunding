"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PessoaFisicaRepository_1 = require("../../Repository/PessoaFisicaRepository");
(0, globals_1.describe)('PessoaFisicaRepository', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new PessoaFisicaRepository_1.PessoaFisicaRepository();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma nova pessoa física com id autoincrement', () => {
            const pessoaFisicaData = { nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com', data_nascimento: new Date('1990-01-01'), senha: 'senha123' };
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
            const pessoa1 = repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com', data_nascimento: new Date('1990-01-01'), senha: 'senha123' });
            const pessoa2 = repository.inserir({ nome: 'Joana Silva', cpf: '123.456.789-01', email: 'joana.silva@example.com', data_nascimento: new Date('1992-01-01'), senha: 'senha124' });
            const pessoa3 = repository.inserir({ nome: 'Caio Castro', cpf: '120.900.789-00', email: 'Caio.Castro@example.com', data_nascimento: new Date('2005-10-05'), senha: 'senha783' });
            const lista = repository.listar();
            (0, globals_1.expect)(lista).toHaveLength(3);
            (0, globals_1.expect)(lista).toContainEqual(pessoa1);
            (0, globals_1.expect)(lista).toContainEqual(pessoa2);
            (0, globals_1.expect)(lista).toContainEqual(pessoa3);
        });
    });
    (0, globals_1.describe)('Buscar por Id', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com', data_nascimento: new Date('1990-01-01'), senha: 'senha123' }),
                repository.inserir({ nome: 'Joana Grog', cpf: '920.890.456-00',
                    email: 'JoanaGrog@example.com', data_nascimento: new Date('2007-10-20'), senha: 'senha890' });
        });
    });
    (0, globals_1.it)('deve encontrar pessoa física por id existente', () => {
        const pessoafisica = repository.buscarporId(1);
        (0, globals_1.expect)(pessoafisica).toEqual({
            id: 1,
            nome: 'João Silva', cpf: '123.456.789-00',
            email: 'joao.silva@example.com',
            data_nascimento: new Date('1990-01-01'),
            senha: 'senha123'
        });
    });
    (0, globals_1.it)('deve retornar undefined para id não existente', () => {
        const pessoafisica = repository.buscarporId(999);
        (0, globals_1.expect)(pessoafisica).toBeUndefined();
    });
    (0, globals_1.describe)('Buscar por Nome', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',
                email: 'joao.silva@example.com', data_nascimento: new Date('1990-01-01'), senha: 'senha123' }),
                repository.inserir({ nome: 'Joana Grog', cpf: '920.890.456-00',
                    email: 'JoanaGrog@example.com', data_nascimento: new Date('2007-10-20'), senha: 'senha890' });
        });
        (0, globals_1.it)('deve encontrar pessoa física por nome existente', () => {
            const pessoafisica = repository.buscarporNome('João Silva');
            (0, globals_1.expect)(pessoafisica).toEqual({
                id: 1,
                nome: 'João Silva', cpf: '123.456.789-00',
                email: 'joao.silva@example.com',
                data_nascimento: new Date('1990-01-01'),
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
            repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',
                email: 'joao.silva@example.com', data_nascimento: new Date('1990-01-01'), senha: 'senha123' });
            repository.inserir({ nome: 'Thiago Neves', cpf: '990.456.789-00',
                email: 'thiagoneves@example.com', data_nascimento: new Date('1986-01-01'), senha: 'senha120' });
        });
        (0, globals_1.it)('Deve Atualizar a pessoa física', () => {
            const result = repository.atualizar(1, { nome: 'João Silva Atualizado', cpf: '126.457.790-01',
                data_nascimento: new Date('2002-08-22'), senha: 'senha221' });
            (0, globals_1.expect)(result).toEqual({
                nome: 'João Silva Atualizado', cpf: '126.457.790-01',
                data_nascimento: new Date('2002-08-22'), senha: 'senha221'
            });
        });
        (0, globals_1.it)('deve retornar undefined ao tentar atualizar pessoa física não existente', () => {
            const result = repository.atualizar(999, { nome: 'Inexistente' });
            (0, globals_1.expect)(result).toBeUndefined();
        });
        (0, globals_1.it)('não deve afetar outras pessoas ao atualizar', () => {
            repository.atualizar(1, { nome: 'Eletrônicos Atualizado', cpf: '126.457.790-01',
                data_nascimento: new Date('2000-08-22'), senha: 'senha221' });
            const outraCategoria = repository.buscarporId(2);
            (0, globals_1.expect)(outraCategoria).toEqual({
                id: 2,
                nome: 'Thiago Neves', cpf: '990.456.789-00',
                email: 'thiagoneves@example.com', data_nascimento: new Date('1986-01-01'), senha: 'senha120'
            });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.beforeEach)(() => {
            repository.inserir({ nome: 'João Silva', cpf: '123.456.789-00',
                email: 'joao.silva@example.com', data_nascimento: new Date('1990-01-01'), senha: 'senha123' });
            repository.inserir({ nome: 'Thiago Neves', cpf: '990.456.789-00',
                email: 'thiagoneves@example.com', data_nascimento: new Date('1986-01-01'), senha: 'senha120' });
            repository.inserir({ nome: 'Naiara Santos', cpf: '780.456.789-00',
                email: 'naiarasantos@example.com', data_nascimento: new Date('1979-08-01'), senha: 'senha330' });
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
