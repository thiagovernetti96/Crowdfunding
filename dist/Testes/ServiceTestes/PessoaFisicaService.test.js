"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PessoaFisicaService_1 = require("../../Service/PessoaFisicaService");
const mockPessoaFisicaRepository = {
    save: globals_1.jest.fn(),
    find: globals_1.jest.fn(),
    findOne: globals_1.jest.fn(),
    remove: globals_1.jest.fn()
};
(0, globals_1.describe)('PessoaFisicaService', () => {
    let pessoaFisicaService;
    let pessoaFisicaRepository;
    (0, globals_1.beforeEach)(() => {
        pessoaFisicaRepository = mockPessoaFisicaRepository;
        pessoaFisicaService = new PessoaFisicaService_1.PessoaFisicaService(pessoaFisicaRepository);
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma pessoa física com sucesso', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            mockPessoaFisicaRepository.save.mockReturnValueOnce(pessoa_fisica);
            const result = await pessoaFisicaService.inserir(pessoa_fisica);
            (0, globals_1.expect)(result).toEqual(pessoa_fisica);
            (0, globals_1.expect)(mockPessoaFisicaRepository.save).toHaveBeenCalledWith(pessoa_fisica);
        });
        (0, globals_1.it)('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
            const pessoa_fisica = { id: 1, nome: '', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: '' };
            await (0, globals_1.expect)(pessoaFisicaService.inserir(pessoa_fisica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é undefined', async () => {
            const pessoa_fisica = { id: 1, nome: undefined, cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            await (0, globals_1.expect)(pessoaFisicaService.inserir(pessoa_fisica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é null', async () => {
            const pessoa_fisica = { id: 1, nome: null, cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            await (0, globals_1.expect)(pessoaFisicaService.inserir(pessoa_fisica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar uma pessoa física existente', async () => {
            const pessoa_fisica_existente = { id: 1, nome: 'João', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica_existente);
            const pessoa_fisica_atualizada = { id: 1, nome: 'João Silva', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao.silva@example.com' };
            mockPessoaFisicaRepository.save.mockReturnValueOnce(pessoa_fisica_atualizada);
            const result = await pessoaFisicaService.atualizar(1, pessoa_fisica_atualizada);
            (0, globals_1.expect)(result).toEqual(pessoa_fisica_atualizada);
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando pessoa física não é encontrada para atualização', async () => {
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
            const pessoa_fisica_atualizada = { id: 1, nome: 'João Silva', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao.silva@example.com' };
            await (0, globals_1.expect)(pessoaFisicaService.atualizar(1, pessoa_fisica_atualizada))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockPessoaFisicaRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar lista de pessoas físicas', async () => {
            const pessoas_fisicas = [
                { id: 1, nome: 'João', cpf: '12345678900', data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' },
                { id: 2, nome: 'Maria', cpf: '09876543211', data_nascimento: new Date('1992-02-02'), email: 'maria@example.com' }
            ];
            mockPessoaFisicaRepository.find.mockReturnValueOnce(pessoas_fisicas);
            const result = await pessoaFisicaService.listar();
            (0, globals_1.expect)(result).toEqual(pessoas_fisicas);
            (0, globals_1.expect)(mockPessoaFisicaRepository.find).toHaveBeenCalled();
        });
        (0, globals_1.it)('deve retornar array vazio quando não há pessoas físicas', async () => {
            mockPessoaFisicaRepository.find.mockReturnValueOnce([]);
            const result = await pessoaFisicaService.listar();
            (0, globals_1.expect)(result).toEqual([]);
            (0, globals_1.expect)(mockPessoaFisicaRepository.find).toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('Buscar por Id', () => {
        (0, globals_1.it)('deve encontrar pessoa física por id existente', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica);
            const result = await pessoaFisicaService.buscarporId(1);
            (0, globals_1.expect)(result).toEqual(pessoa_fisica);
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro para id não existente', async () => {
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(pessoaFisicaService.buscarporId(999))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
        });
    });
    (0, globals_1.describe)('Buscar por Nome', () => {
        (0, globals_1.it)('deve encontrar pessoa física por nome existente', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica);
            const result = await pessoaFisicaService.buscarporNome('João');
            (0, globals_1.expect)(result).toEqual(pessoa_fisica);
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'João' } });
        });
        (0, globals_1.it)('deve lançar erro para nome não existente', async () => {
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(pessoaFisicaService.buscarporNome('Inexistente'))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'Inexistente' } });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar pessoa física existente', async () => {
            const pessoa_fisica = { id: 1, nome: 'João', cpf: '12345678900',
                data_nascimento: new Date('1990-01-01'), email: 'joao@example.com' };
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(pessoa_fisica);
            await pessoaFisicaService.deletar(1);
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockPessoaFisicaRepository.remove).toHaveBeenCalledWith(pessoa_fisica);
        });
        (0, globals_1.it)('deve lançar erro ao tentar deletar pessoa física não existente', async () => {
            mockPessoaFisicaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(pessoaFisicaService.deletar(999))
                .rejects.toEqual({ id: 404, msg: "Pessoa não encontrada" });
            (0, globals_1.expect)(mockPessoaFisicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
            (0, globals_1.expect)(mockPessoaFisicaRepository.remove).not.toHaveBeenCalled();
        });
    });
});
