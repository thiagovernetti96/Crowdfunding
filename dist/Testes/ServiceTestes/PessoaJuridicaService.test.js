"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PessoaJuridicaService_1 = require("../../Service/PessoaJuridicaService");
const mockPessoaJuridicaRepository = {
    save: globals_1.jest.fn(),
    find: globals_1.jest.fn(),
    findOne: globals_1.jest.fn(),
    remove: globals_1.jest.fn()
};
(0, globals_1.describe)('PessoaJuridicaService', () => {
    let pessoaJuridicaService;
    let pessoaJuridicaRepository;
    (0, globals_1.beforeEach)(() => {
        pessoaJuridicaRepository = mockPessoaJuridicaRepository;
        pessoaJuridicaService = new PessoaJuridicaService_1.PessoaJuridicaService(pessoaJuridicaRepository);
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma pessoa jurídica com sucesso', async () => {
            const pessoa_juridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
                email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' };
            mockPessoaJuridicaRepository.save.mockReturnValueOnce(pessoa_juridica);
            const result = await pessoaJuridicaService.inserir(pessoa_juridica);
            (0, globals_1.expect)(result).toEqual(pessoa_juridica);
            (0, globals_1.expect)(mockPessoaJuridicaRepository.save).toHaveBeenCalledWith(pessoa_juridica);
        });
        (0, globals_1.it)('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
            const pessoa_juridica = { id: 1, nome: '', cnpj: '12345678000199',
                email: '' };
            await (0, globals_1.expect)(pessoaJuridicaService.inserir(pessoa_juridica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é undefined', async () => {
            const pessoa_juridica = { id: 1, nome: undefined, cnpj: '12345678000199',
                email: 'contato@empresax.com' };
            await (0, globals_1.expect)(pessoaJuridicaService.inserir(pessoa_juridica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é null', async () => {
            const pessoa_juridica = { id: 1, nome: null, cnpj: '12345678000199',
                email: 'contato@empresax.com' };
            await (0, globals_1.expect)(pessoaJuridicaService.inserir(pessoa_juridica))
                .rejects.toEqual({ id: 400, msg: "Todos os dados são obrigatórios" });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar uma pessoa juridica existente', async () => {
            const pessoa_juridica_existente = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
                razao_social: 'Empresa X Ltda', email: 'contato@empresax.com', senha: 'senha123' };
            mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(pessoa_juridica_existente);
            const pessoa_juridica_atualizada = { id: 1, nome: 'Empresa Y', cnpj: '98765432000188',
                razao_social: 'Empresa Y Ltda', email: 'contato@empresay.com', senha: 'senha456' };
            mockPessoaJuridicaRepository.save.mockReturnValueOnce(pessoa_juridica_atualizada);
            const result = await pessoaJuridicaService.atualizar(1, pessoa_juridica_atualizada);
            (0, globals_1.expect)(result).toEqual(pessoa_juridica_atualizada);
            (0, globals_1.expect)(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro ao tentar atualizar uma pessoa jurídica inexistente', async () => {
            mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(undefined);
            const pessoa_juridica_atualizada = { id: 1, nome: 'Empresa Y', cnpj: '98765432000188',
                email: 'contato@empresay.com', senha: 'senha456', razao_social: 'Empresa Y Ltda' };
            await (0, globals_1.expect)(pessoaJuridicaService.atualizar(1, pessoa_juridica_atualizada))
                .rejects.toEqual({ id: 404, msg: "Pessoa jurídica não encontrada" });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve retornar uma pessoa jurídica existente por ID', async () => {
            const pessoa_juridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
                email: 'contato@empresax.com' };
            mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(pessoa_juridica);
            const result = await pessoaJuridicaService.buscarporId(1);
            (0, globals_1.expect)(result).toEqual(pessoa_juridica);
            (0, globals_1.expect)(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando pessoa jurídica não é encontrada por ID', async () => {
            mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(pessoaJuridicaService.buscarporId(999))
                .rejects.toEqual({ id: 404, msg: "Pessoa jurídica não encontrada" });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar lista de pessoas jurídicas', async () => {
            const pessoas_juridicas = [
                { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
                    email: 'contato@empresax.com' },
                { id: 2, nome: 'Empresa Y', cnpj: '98765432000188',
                    email: 'contato@empresay.com' }
            ];
            mockPessoaJuridicaRepository.find.mockReturnValueOnce(pessoas_juridicas);
            const result = await pessoaJuridicaService.listar();
            (0, globals_1.expect)(result).toEqual(pessoas_juridicas);
            (0, globals_1.expect)(mockPessoaJuridicaRepository.find).toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar uma pessoa jurídica existente', async () => {
            const pessoa_juridica = { id: 1, nome: 'Empresa X', cnpj: '12345678000199',
                email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' };
            mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(pessoa_juridica);
            const result = await pessoaJuridicaService.deletar(1);
            (0, globals_1.expect)(result).toBe(undefined);
            (0, globals_1.expect)(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.remove).toHaveBeenCalledWith(pessoa_juridica);
        });
        (0, globals_1.it)('deve lançar erro ao tentar deletar uma pessoa jurídica inexistente', async () => {
            mockPessoaJuridicaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(pessoaJuridicaService.deletar(999))
                .rejects.toEqual({ id: 404, msg: "Pessoa jurídica não encontrada" });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
            (0, globals_1.expect)(mockPessoaJuridicaRepository.remove).not.toHaveBeenCalled();
        });
    });
});
