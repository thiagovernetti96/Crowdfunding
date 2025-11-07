"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const UsuarioController_1 = require("../../Controller/UsuarioController");
const mockUsuarioService = {
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
(0, globals_1.describe)('UsuarioController', () => {
    let usuarioController;
    let usuarioService;
    let res;
    (0, globals_1.beforeEach)(() => {
        usuarioService = mockUsuarioService;
        usuarioController = new UsuarioController_1.UsuarioController(usuarioService);
        res = mockResponse();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir pessoa fisica com sucesso e retornar status 201', async () => {
            const req = mockRequest({ nome: 'João Silva' });
            const usuarioMock = { id: 1, nome: 'João Silva' };
            usuarioService.inserir.mockResolvedValue(usuarioMock);
            await usuarioController.inserir(req, res);
            (0, globals_1.expect)(usuarioService.inserir).toHaveBeenCalledWith({ nome: 'João Silva' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(usuarioMock);
        });
        (0, globals_1.it)('deve tratar erro ao inserir pessoa fisica e retornar status 400', async () => {
            const req = mockRequest({ nome: '', cpf: 'invalid-cpf' });
            const errorMock = { id: 1, msg: 'Dados inválidos' };
            usuarioService.inserir.mockRejectedValue(errorMock);
            await usuarioController.inserir(req, res);
            (0, globals_1.expect)(usuarioService.inserir).toHaveBeenCalledWith({ nome: '' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar todas as pessoas fisicas e retornar status 200', async () => {
            const req = mockRequest();
            const pessoasFisicasMock = [
                { id: 1, nome: 'João Silva' },
                { id: 2, nome: 'Maria Souza' }
            ];
            usuarioService.listar.mockResolvedValue(pessoasFisicasMock);
            await usuarioController.listar(req, res);
            (0, globals_1.expect)(usuarioService.listar).toHaveBeenCalled();
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(pessoasFisicasMock);
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve buscar pessoa fisica por id e retornar status 200', async () => {
            const req = mockRequest(undefined, { id: '1' });
            const usuarioMock = { id: 1, nome: 'João Silva' };
            usuarioService.buscarporId.mockResolvedValue(usuarioMock);
            await usuarioController.buscarporId(req, res);
            (0, globals_1.expect)(usuarioService.buscarporId).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(usuarioMock);
        });
        (0, globals_1.it)('deve tratar erro ao buscar pessoa fisica por id e retornar status 404', async () => {
            const req = mockRequest(undefined, { id: '999' });
            const errorMock = { id: 404, msg: 'Pessoa física não encontrada' };
            usuarioService.buscarporId.mockRejectedValue(errorMock);
            await usuarioController.buscarporId(req, res);
            (0, globals_1.expect)(usuarioService.buscarporId).toHaveBeenCalledWith(999);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.it)('deve buscar pessoas fisicas por nome e retornar status 200', async () => {
            const req = mockRequest({}, { nome: 'João' });
            const usuarioMock = { id: 1, nome: 'João' };
            usuarioService.buscarporNome.mockResolvedValue(usuarioMock);
            await usuarioController.buscarporNome(req, res);
            (0, globals_1.expect)(usuarioService.buscarporNome).toHaveBeenCalledWith('João');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith([usuarioMock]);
        });
        (0, globals_1.it)('deve tratar erro ao buscar pessoas fisicas por nome e retornar status 500', async () => {
            const req = mockRequest(undefined, { nome: 'João' });
            const errorMock = { id: 500, msg: 'Erro interno' };
            usuarioService.buscarporNome.mockRejectedValue(errorMock);
            await usuarioController.buscarporNome(req, res);
            (0, globals_1.expect)(usuarioService.buscarporNome).toHaveBeenCalledWith('João');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(500);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Erro interno' });
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar pessoa fisica com sucesso e retornar status 200', async () => {
            const req = mockRequest({ nome: 'João Atualizado' }, { id: '1' });
            const usuarioMock = { id: 1, nome: 'João Atualizado' };
            usuarioService.atualizar.mockResolvedValue(usuarioMock);
            await usuarioController.atualizar(req, res);
            (0, globals_1.expect)(usuarioService.atualizar).toHaveBeenCalledWith(1, { nome: 'João Atualizado' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(usuarioMock);
        });
        (0, globals_1.it)('deve tratar erro ao atualizar pessoa fisica e retornar status 400', async () => {
            const req = mockRequest({ nome: '', cpf: 'invalid-cpf' }, { id: '1' });
            const errorMock = { id: 400, msg: 'Dados inválidos' };
            usuarioService.atualizar.mockRejectedValue(errorMock);
            await usuarioController.atualizar(req, res);
            (0, globals_1.expect)(usuarioService.atualizar).toHaveBeenCalledWith(1, { nome: '' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar pessoa fisica com sucesso e retornar status 204', async () => {
            const req = mockRequest(undefined, { id: '1' });
            usuarioService.deletar.mockResolvedValue(undefined);
            await usuarioController.deletar(req, res);
            (0, globals_1.expect)(usuarioService.deletar).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(204);
            (0, globals_1.expect)(res.json).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve tratar erro ao deletar pessoa fisica e retornar status 404', async () => {
            const req = mockRequest(undefined, { id: '999' });
            const errorMock = { id: 404, msg: 'Pessoa física não encontrada' };
            usuarioService.deletar.mockRejectedValue(errorMock);
            await usuarioController.deletar(req, res);
            (0, globals_1.expect)(usuarioService.deletar).toHaveBeenCalledWith(999);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(errorMock);
        });
    });
});
