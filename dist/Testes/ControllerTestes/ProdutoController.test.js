"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ProdutoController_1 = require("../../Controller/ProdutoController");
const mockProdutoService = {
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
(0, globals_1.describe)('ProdutoController', () => {
    let produtoController;
    let produtoService;
    let res;
    (0, globals_1.beforeEach)(() => {
        produtoService = mockProdutoService;
        produtoController = new ProdutoController_1.ProdutoController(produtoService);
        res = mockResponse();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir produto com sucesso e retornar status 201', async () => {
            const req = mockRequest({ nome: 'Produto X', descricao: 'Descrição do Produto X', valor_meta: 100.0, categoria: { id: 1 } });
            const produtoMock = { id: 1, ...req.body };
            produtoService.inserir.mockResolvedValue(produtoMock);
            await produtoController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(produtoMock);
        });
        (0, globals_1.it)('deve tratar erro ao inserir produto e retornar status 400', async () => {
            const req = mockRequest({ nome: '', descricao: 'Descrição do Produto X', valor_meta: 100.0, categoria: { id: 1 } });
            const errorMock = { id: 1, msg: 'Dados inválidos' };
            produtoService.inserir.mockRejectedValue(errorMock);
            await produtoController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ error: "Erro ao inserir produto" });
        });
    });
    /*describe('listar', () => {
      it('deve listar produtos com sucesso e retornar status 200', async () => {
        const req = mockRequest();
        const produtosMock = [
          { id: 1, nome: 'Produto X', descricao: 'Descrição do Produto X', valor_meta: 100.0, categoria: { id: 1 } },
        ];
        produtoService.listar.mockResolvedValueOnce(produtosMock);
        await produtoController.listar(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(produtosMock);
      });
      it('deve tratar erro ao listar produtos e retornar status 400', async () => {
        const req = mockRequest();
        const errorMock: MockError = { id: 1, msg: 'Erro ao listar produtos' };
        produtoService.listar.mockRejectedValue(errorMock);
        await produtoController.listar(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Erro ao listar produtos" });
      });
    });*/
    /*describe('buscarporId', () => {
      it('deve buscar produto por id com sucesso e retornar status 201', async () => {
        const req = mockRequest(undefined, { id: '1' });
        const produtoMock = { id: 1, nome: 'Produto X', descricao: 'Descrição do Produto X', valor_meta: 100.0, categoria: { id: 1 } };
        produtoService.buscarporId.mockResolvedValueOnce(produtoMock);
        await produtoController.buscarporId(req, res);
        expect(produtoService.buscarporId).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(produtoMock);
      });
      it('deve tratar erro ao buscar produto por id e retornar status 400', async () => {
        const req = mockRequest(undefined, { id: '999' });
        const errorMock: MockError = { id: 1, msg: 'Produto não encontrado' };
        produtoService.buscarporId.mockRejectedValue(errorMock);
        await produtoController.buscarporId(req, res);
        expect(produtoService.buscarporId).toHaveBeenCalledWith(999);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar produto por ID" });
      });
    });*/
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar produto com sucesso e retornar status 200', async () => {
            const req = mockRequest({ nome: 'Produto Atualizado', descricao: 'Descrição do Produto Atualizado', valor_meta: 150.0, categoria: { id: 2 } }, { id: '1' });
            const produtoMock = { id: 1, ...req.body };
            produtoService.atualizar.mockResolvedValue(produtoMock);
            await produtoController.atualizar(req, res);
            (0, globals_1.expect)(produtoService.atualizar).toHaveBeenCalledWith(1, req.body);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(produtoMock);
        });
        (0, globals_1.it)('deve retornar erro quando produto não encontrado para atualizar', async () => {
            const req = mockRequest({ nome: 'Novo Nome' }, { id: '999' });
            const erroMock = { id: 400, msg: 'Produto não encontrado' };
            produtoService.atualizar.mockRejectedValue(erroMock);
            await produtoController.atualizar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Produto não encontrado' });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar produto com sucesso e retornar status 204', async () => {
            const req = mockRequest(undefined, { id: '1' });
            produtoService.deletar.mockResolvedValueOnce();
            await produtoController.deletar(req, res);
            (0, globals_1.expect)(produtoService.deletar).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(204);
        });
        (0, globals_1.it)('deve retornar erro ao tentar deletar produto inexistente', async () => {
            const req = mockRequest({}, { id: '999' });
            const erroMock = { id: 404, msg: 'Produto não encontrado' };
            produtoService.deletar.mockRejectedValue(erroMock);
            await produtoController.deletar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Produto não encontrado' });
        });
    });
});
