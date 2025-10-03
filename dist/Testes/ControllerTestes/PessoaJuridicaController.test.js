"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PessoaJuridicaController_1 = require("../../Controller/PessoaJuridicaController");
const mockPessoaJuridicaService = {
    inserir: globals_1.jest.fn(),
    listar: globals_1.jest.fn(),
    buscarPorId: globals_1.jest.fn(),
    buscarPorNome: globals_1.jest.fn(),
    atualizar: globals_1.jest.fn(),
    deletar: globals_1.jest.fn()
};
const mockResponse = () => {
    const res = {
        status: globals_1.jest.fn().mockReturnThis(),
        json: globals_1.jest.fn().mockReturnThis(),
    };
    return res;
};
const mockRequest = (body, params) => {
    return {
        body,
        params
    };
};
(0, globals_1.describe)('PessoaJuridicaController', () => {
    let pessoaJuridicaController;
    let pessoaJuridicaService;
    let res;
    (0, globals_1.beforeEach)(() => {
        pessoaJuridicaService = mockPessoaJuridicaService;
        pessoaJuridicaController = new PessoaJuridicaController_1.PessoaJuridicaController(pessoaJuridicaService);
        res = mockResponse();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir pessoa juridica com sucesso e retornar status 200', async () => {
            const req = mockRequest({ nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' });
            pessoaJuridicaService.inserir.mockResolvedValue({ id: 1, ...req.body });
            await pessoaJuridicaController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
        });
        (0, globals_1.it)('deve tratar erro ao inserir pessoa juridica e retornar status 400', async () => {
            const req = mockRequest({ nome: '', cnpj: 'invalid-cnpj', email: 'invalid-email', senha: '', razao_social: '' });
            const errorMock = { id: 1, msg: 'Dados inválidos' };
            pessoaJuridicaService.inserir.mockRejectedValue(errorMock);
            await pessoaJuridicaController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ error: "Erro ao inserir pessoa jurídica" });
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar pessoas juridicas com sucesso e retornar status 200', async () => {
            const req = mockRequest();
            const pessoasJuridicasMock = [
                { id: 1, nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' },
            ];
            pessoaJuridicaService.listar.mockResolvedValueOnce(pessoasJuridicasMock);
            await pessoaJuridicaController.listar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoasJuridicasMock);
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve buscar pessoa juridica por id com sucesso e retornar status 200', async () => {
            const req = mockRequest(undefined, { id: '1' });
            const pessoaJuridicaMock = { id: 1, nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' };
            pessoaJuridicaService.buscarporId.mockResolvedValue(pessoaJuridicaMock);
            await pessoaJuridicaController.buscarporId(req, res);
            (0, globals_1.expect)(pessoaJuridicaService.buscarporId).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoaJuridicaMock);
        });
        (0, globals_1.it)('deve retornar erro quando Pessoa Jurídica não encontrada', async () => {
            const req = mockRequest({}, { id: '999' });
            const erroMock = { id: 404, msg: 'Pessoa jurídica não encontrada' };
            pessoaJuridicaService.buscarporId.mockRejectedValue(erroMock);
            await pessoaJuridicaController.buscarporId(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Pessoa jurídica não encontrada' });
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.it)('deve buscar pessoa juridica por nome com sucesso e retornar status 200', async () => {
            const req = mockRequest({}, { nome: 'Empresa X' });
            const pessoaJuridicaMock = { id: 1, nome: 'Empresa X', cnpj: '12345678000199', email: 'contato@empresax.com', senha: 'senha123', razao_social: 'Empresa X Ltda' };
            pessoaJuridicaService.buscarporNome.mockResolvedValue(pessoaJuridicaMock);
            await pessoaJuridicaController.buscarporNome(req, res);
            (0, globals_1.expect)(pessoaJuridicaService.buscarporNome).toHaveBeenCalledWith('Empresa X');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoaJuridicaMock);
        });
        (0, globals_1.it)('deve retornar erro quando pessoa jurídica não encontrada por nome', async () => {
            const req = mockRequest({}, { nome: 'Inexistente' });
            const erroMock = { id: 404, msg: 'Pessoa jurídica não encontrada' };
            pessoaJuridicaService.buscarporNome.mockRejectedValue(erroMock);
            await pessoaJuridicaController.buscarporNome(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 404 });
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar pessoa juridica com sucesso e retornar status 200', async () => {
            const req = mockRequest({ id: 1, nome: 'Empresa Y', cnpj: '98765432000188', email: 'contato@empresay.com', senha: 'senha456', razao_social: 'Empresa Y Ltda' });
            const pessoaJuridicaMock = { id: 1, nome: 'Empresa Y', cnpj: '98765432000188', email: 'contato@empresay.com', senha: 'senha456', razao_social: 'Empresa Y Ltda' };
            pessoaJuridicaService.atualizar.mockResolvedValueOnce(pessoaJuridicaMock);
            await pessoaJuridicaController.atualizar(req, res);
            (0, globals_1.expect)(pessoaJuridicaService.atualizar).toHaveBeenCalledWith(1, req.body);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoaJuridicaMock);
        });
        (0, globals_1.it)('deve tratar erro ao atualizar pessoa juridica e retornar status 400', async () => {
            const req = mockRequest({ id: 999, nome: 'Empresa Inexistente', cnpj: '00000000000000', email: 'invalid-email', senha: '', razao_social: '' });
            const errorMock = { id: 404, msg: 'Pessoa jurídica não encontrada' };
            pessoaJuridicaService.atualizar.mockRejectedValue(errorMock);
            await pessoaJuridicaController.atualizar(req, res);
            (0, globals_1.expect)(pessoaJuridicaService.atualizar).toHaveBeenCalledWith(999, req.body);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ error: "Erro ao atualizar pessoa jurídica" });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar pessoa juridica com sucesso e retornar status 204', async () => {
            const req = mockRequest(undefined, { id: '1' });
            pessoaJuridicaService.deletar.mockResolvedValueOnce();
            await pessoaJuridicaController.deletar(req, res);
            (0, globals_1.expect)(pessoaJuridicaService.deletar).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(204);
        });
        (0, globals_1.it)('deve tratar erro ao deletar pessoa juridica e retornar status 400', async () => {
            const req = mockRequest(undefined, { id: '999' });
            const errorMock = { id: 404, msg: 'Pessoa jurídica não encontrada' };
            pessoaJuridicaService.deletar.mockRejectedValue(errorMock);
            await pessoaJuridicaController.deletar(req, res);
            (0, globals_1.expect)(pessoaJuridicaService.deletar).toHaveBeenCalledWith(999);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ error: "Erro ao deletar pessoa jurídica" });
        });
    });
});
