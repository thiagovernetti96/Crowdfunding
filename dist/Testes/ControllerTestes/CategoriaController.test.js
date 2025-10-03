"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const CategoriaController_1 = require("../../Controller/CategoriaController");
const mockCategoriaService = {
    inserir: globals_1.jest.fn(),
    listar: globals_1.jest.fn(),
    buscarporId: globals_1.jest.fn(),
    buscarporNome: globals_1.jest.fn(),
    atualizar: globals_1.jest.fn(),
    deletar: globals_1.jest.fn()
};
const mockResponse = () => {
    const res = {};
    res.status = globals_1.jest.fn((code) => res);
    res.json = globals_1.jest.fn((data) => res);
    res.send = globals_1.jest.fn((data) => res);
    return res;
};
const mockRequest = (body, params) => {
    return {
        body,
        params
    };
};
(0, globals_1.describe)('CategoriaController', () => {
    let categoriaController;
    let categoriaService;
    let res;
    (0, globals_1.beforeEach)(() => {
        categoriaService = mockCategoriaService;
        categoriaController = new CategoriaController_1.CategoriaController(categoriaService);
        res = mockResponse();
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir categoria com sucesso e retornar status 201', async () => {
            const req = mockRequest({ nome: 'Electrónicos' });
            const categoriaMock = { id: 1, nome: 'Electrónicos' };
            categoriaService.inserir.mockResolvedValue(categoriaMock);
            await categoriaController.inserir(req, res);
            (0, globals_1.expect)(categoriaService.inserir).toHaveBeenCalledWith({ nome: 'Electrónicos' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(categoriaMock);
        });
        (0, globals_1.it)('deve retornar erro 400 quando service lançar exceção', async () => {
            const req = mockRequest({ nome: '' });
            const erroMock = { id: 400, msg: 'O nome da categoria é obrigatório' };
            categoriaService.inserir.mockRejectedValue(erroMock);
            await categoriaController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'O nome da categoria é obrigatório' });
        });
        (0, globals_1.it)('deve tratar erro quando nome é undefined', async () => {
            const req = mockRequest({ nome: undefined });
            const erroMock = { id: 400, msg: 'O nome da categoria é obrigatório' };
            categoriaService.inserir.mockRejectedValue(erroMock);
            await categoriaController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'O nome da categoria é obrigatório' });
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar lista de categorias com status 200', async () => {
            const req = mockRequest();
            const categoriasMock = [
                { id: 1, nome: 'Electrónicos' },
                { id: 2, nome: 'Roupas' }
            ];
            categoriaService.listar.mockResolvedValue(categoriasMock);
            await categoriaController.listar(req, res);
            (0, globals_1.expect)(categoriaService.listar).toHaveBeenCalled();
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(categoriasMock);
        });
        (0, globals_1.it)('deve retornar erro quando service falhar', async () => {
            const req = mockRequest();
            const erroMock = { id: 500, msg: 'Erro interno' };
            categoriaService.listar.mockRejectedValue(erroMock);
            await categoriaController.listar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(500);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Erro interno' });
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve retornar categoria por ID com status 200', async () => {
            const req = mockRequest({}, { id: '1' });
            const categoriaMock = { id: 1, nome: 'Electrónicos' };
            categoriaService.buscarporId.mockResolvedValue(categoriaMock);
            await categoriaController.buscarporId(req, res);
            (0, globals_1.expect)(categoriaService.buscarporId).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(categoriaMock);
        });
        (0, globals_1.it)('deve retornar erro quando categoria não encontrada', async () => {
            const req = mockRequest({}, { id: '999' });
            const erroMock = { id: 400, msg: 'Categoria não encontrada' };
            categoriaService.buscarporId.mockRejectedValue(erroMock);
            await categoriaController.buscarporId(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Categoria não encontrada' });
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.it)('deve retornar categoria por nome com status 200', async () => {
            const req = mockRequest({}, { nome: 'Electrónicos' });
            const categoriaMock = { id: 1, nome: 'Electrónicos' };
            categoriaService.buscarporNome.mockResolvedValue(categoriaMock);
            await categoriaController.buscarporNome(req, res);
            (0, globals_1.expect)(categoriaService.buscarporNome).toHaveBeenCalledWith('Electrónicos');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(categoriaMock);
        });
        (0, globals_1.it)('deve retornar erro quando categoria não encontrada por nome', async () => {
            const req = mockRequest({}, { nome: 'Inexistente' });
            const erroMock = { id: 404, msg: 'Categoria não encontrada' };
            categoriaService.buscarporNome.mockRejectedValue(erroMock);
            await categoriaController.buscarporNome(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 404 });
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar categoria com sucesso', async () => {
            const req = mockRequest({ nome: 'Eletrodomésticos' }, { id: '1' });
            const categoriaAtualizadaMock = { id: 1, nome: 'Eletrodomésticos' };
            categoriaService.atualizar.mockResolvedValue(categoriaAtualizadaMock);
            await categoriaController.atualizar(req, res);
            (0, globals_1.expect)(categoriaService.atualizar).toHaveBeenCalledWith(1, { nome: 'Eletrodomésticos' });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(categoriaAtualizadaMock);
        });
        (0, globals_1.it)('deve retornar erro quando categoria não encontrada para atualizar', async () => {
            const req = mockRequest({ nome: 'Novo Nome' }, { id: '999' });
            const erroMock = { id: 400, msg: 'Categoria não encontrada' };
            categoriaService.atualizar.mockRejectedValue(erroMock);
            await categoriaController.atualizar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Categoria não encontrada' });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar categoria com sucesso e retornar status 204', async () => {
            const req = mockRequest({}, { id: '1' });
            categoriaService.deletar.mockResolvedValue(undefined);
            await categoriaController.deletar(req, res);
            (0, globals_1.expect)(categoriaService.deletar).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(204);
            (0, globals_1.expect)(res.send).toHaveBeenCalled();
        });
        (0, globals_1.it)('deve retornar erro ao tentar deletar categoria inexistente', async () => {
            const req = mockRequest({}, { id: '999' });
            const erroMock = { id: 404, msg: 'Categoria não encontrada' };
            categoriaService.deletar.mockRejectedValue(erroMock);
            await categoriaController.deletar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Categoria não encontrada' });
        });
    });
});
