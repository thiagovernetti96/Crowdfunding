"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const PessoaFisicaController_1 = require("../../Controller/PessoaFisicaController");
const mockPessoaFisicaService = {
    inserir: globals_1.jest.fn(),
    listar: globals_1.jest.fn(),
    buscarporId: globals_1.jest.fn(),
    buscarporNome: globals_1.jest.fn(),
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
(0, globals_1.describe)('PessoaFisicaController', () => {
    let pessoaFisicaController;
    let pessoaFisicaService;
    let res;
    (0, globals_1.beforeEach)(() => {
        pessoaFisicaService = mockPessoaFisicaService;
        pessoaFisicaController = new PessoaFisicaController_1.PessoaFisicaController(pessoaFisicaService);
        res = mockResponse();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir pessoa fisica com sucesso e retornar status 201', async () => {
            const req = mockRequest({ nome: 'João Silva', cpf: '123.456.789-00' });
            const pessoaFisicaMock = { id: 1, nome: 'João Silva', cpf: '123.456.789-00' };
            pessoaFisicaService.inserir.mockResolvedValue(pessoaFisicaMock);
            await pessoaFisicaController.inserir(req, res);
            (0, globals_1.expect)(pessoaFisicaService.inserir).toHaveBeenCalledWith({ nome: 'João Silva', cpf: '123.456.789-00' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoaFisicaMock);
        });
        (0, globals_1.it)('deve tratar erro ao inserir pessoa fisica e retornar status 400', async () => {
            const req = mockRequest({ nome: '', cpf: 'invalid-cpf' });
            const errorMock = { id: 1, msg: 'Dados inválidos' };
            pessoaFisicaService.inserir.mockRejectedValue(errorMock);
            await pessoaFisicaController.inserir(req, res);
            (0, globals_1.expect)(pessoaFisicaService.inserir).toHaveBeenCalledWith({ nome: '', cpf: 'invalid-cpf' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar todas as pessoas fisicas e retornar status 200', async () => {
            const req = mockRequest();
            const pessoasFisicasMock = [
                { id: 1, nome: 'João Silva', cpf: '123.456.789-00' },
                { id: 2, nome: 'Maria Souza', cpf: '987.654.321-00' }
            ];
            pessoaFisicaService.listar.mockResolvedValue(pessoasFisicasMock);
            await pessoaFisicaController.listar(req, res);
            (0, globals_1.expect)(pessoaFisicaService.listar).toHaveBeenCalled();
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoasFisicasMock);
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve buscar pessoa fisica por id e retornar status 200', async () => {
            const req = mockRequest(undefined, { id: '1' });
            const pessoaFisicaMock = { id: 1, nome: 'João Silva', cpf: '123.456.789-00' };
            pessoaFisicaService.buscarporId.mockResolvedValue(pessoaFisicaMock);
            await pessoaFisicaController.buscarporId(req, res);
            (0, globals_1.expect)(pessoaFisicaService.buscarporId).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoaFisicaMock);
        });
        (0, globals_1.it)('deve tratar erro ao buscar pessoa fisica por id e retornar status 404', async () => {
            const req = mockRequest(undefined, { id: '999' });
            const errorMock = { id: 404, msg: 'Pessoa física não encontrada' };
            pessoaFisicaService.buscarporId.mockRejectedValue(errorMock);
            await pessoaFisicaController.buscarporId(req, res);
            (0, globals_1.expect)(pessoaFisicaService.buscarporId).toHaveBeenCalledWith(999);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.it)('deve buscar pessoas fisicas por nome e retornar status 200', async () => {
            const req = mockRequest({}, { nome: 'João' });
            const pessoaFisicaMock = { id: 1, nome: 'João', cpf: '123.456.789-00' };
            pessoaFisicaService.buscarporNome.mockResolvedValue(pessoaFisicaMock);
            await pessoaFisicaController.buscarporNome(req, res);
            (0, globals_1.expect)(pessoaFisicaService.buscarporNome).toHaveBeenCalledWith('João');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith([pessoaFisicaMock]);
        });
        (0, globals_1.it)('deve tratar erro ao buscar pessoas fisicas por nome e retornar status 500', async () => {
            const req = mockRequest(undefined, { nome: 'João' });
            const errorMock = { id: 500, msg: 'Erro interno' };
            pessoaFisicaService.buscarporNome.mockRejectedValue(errorMock);
            await pessoaFisicaController.buscarporNome(req, res);
            (0, globals_1.expect)(pessoaFisicaService.buscarporNome).toHaveBeenCalledWith('João');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(500);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Erro interno' });
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar pessoa fisica com sucesso e retornar status 200', async () => {
            const req = mockRequest({ nome: 'João Atualizado', cpf: '123.456.789-00' }, { id: '1' });
            const pessoaFisicaMock = { id: 1, nome: 'João Atualizado', cpf: '123.456.789-00' };
            pessoaFisicaService.atualizar.mockResolvedValue(pessoaFisicaMock);
            await pessoaFisicaController.atualizar(req, res);
            (0, globals_1.expect)(pessoaFisicaService.atualizar).toHaveBeenCalledWith(1, { nome: 'João Atualizado', cpf: '123.456.789-00' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoaFisicaMock);
        });
        (0, globals_1.it)('deve tratar erro ao atualizar pessoa fisica e retornar status 400', async () => {
            const req = mockRequest({ nome: '', cpf: 'invalid-cpf' }, { id: '1' });
            const errorMock = { id: 400, msg: 'Dados inválidos' };
            pessoaFisicaService.atualizar.mockRejectedValue(errorMock);
            await pessoaFisicaController.atualizar(req, res);
            (0, globals_1.expect)(pessoaFisicaService.atualizar).toHaveBeenCalledWith(1, { nome: '', cpf: 'invalid-cpf' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar pessoa fisica com sucesso e retornar status 204', async () => {
            const req = mockRequest(undefined, { id: '1' });
            pessoaFisicaService.deletar.mockResolvedValue(undefined);
            await pessoaFisicaController.deletar(req, res);
            (0, globals_1.expect)(pessoaFisicaService.deletar).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(204);
            (0, globals_1.expect)(res.json).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve tratar erro ao deletar pessoa fisica e retornar status 404', async () => {
            const req = mockRequest(undefined, { id: '999' });
            const errorMock = { id: 404, msg: 'Pessoa física não encontrada' };
            pessoaFisicaService.deletar.mockRejectedValue(errorMock);
            await pessoaFisicaController.deletar(req, res);
            (0, globals_1.expect)(pessoaFisicaService.deletar).toHaveBeenCalledWith(999);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
});
