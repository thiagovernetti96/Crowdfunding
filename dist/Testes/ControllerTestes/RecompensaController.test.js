"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const RecompensaController_1 = require("../../Controller/RecompensaController");
const mockRecompensaService = {
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
(0, globals_1.describe)('RecompensaController', () => {
    let recompensaController;
    let recompensaService;
    let res;
    (0, globals_1.beforeEach)(() => {
        recompensaService = mockRecompensaService;
        recompensaController = new RecompensaController_1.RecompensaController(recompensaService);
        res = mockResponse();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir recompensa com sucesso e retornar status 201', async () => {
            const req = mockRequest({ nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 });
            const recompensaMock = { id: 1, ...req.body };
            recompensaService.inserir.mockResolvedValue(recompensaMock);
            await recompensaController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(recompensaMock);
        });
        (0, globals_1.it)('deve retornar erro 400 quando service lançar exceção', async () => {
            const req = mockRequest({ nome: '' });
            const erroMock = { id: 400, msg: 'O nome da recompensa é obrigatório' };
            recompensaService.inserir.mockRejectedValue(erroMock);
            await recompensaController.inserir(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'O nome da recompensa é obrigatório' });
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar recompensas com sucesso e retornar status 200', async () => {
            const req = mockRequest();
            const recompensasMock = [
                { id: 1, nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 },
            ];
            recompensaService.listar.mockResolvedValueOnce(recompensasMock);
            await recompensaController.listar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(recompensasMock);
        });
        (0, globals_1.it)('deve tratar erro ao listar recompensas e retornar status 400', async () => {
            const req = mockRequest();
            const errorMock = { id: 1, msg: 'Erro ao listar recompensas' };
            recompensaService.listar.mockRejectedValue(errorMock);
            await recompensaController.listar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(400);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ error: "Erro ao listar recompensas" });
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve buscar recompensa por id com sucesso e retornar status 201', async () => {
            const req = mockRequest(undefined, { id: '1' });
            const recompensaMock = { id: 1, nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 };
            recompensaService.buscarporId.mockResolvedValue(recompensaMock);
            await recompensaController.buscarporId(req, res);
            (0, globals_1.expect)(recompensaService.buscarporId).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(recompensaMock);
        });
        (0, globals_1.it)('deve retornar erro ao tentar deletar recompensa inexistente', async () => {
            const req = mockRequest({}, { id: '999' });
            const erroMock = { id: 404, msg: 'Recompensa não encontrada' };
            recompensaService.deletar.mockRejectedValue(erroMock);
            await recompensaController.deletar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Recompensa não encontrada' });
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.it)('deve buscar recompensa por nome com sucesso e retornar status 201', async () => {
            const req = mockRequest({}, { nome: 'Recompensa X' });
            const recompensaMock = { id: 1, nome: 'Recompensa X', descricao: 'Descrição da Recompensa X', valor: 50.0 };
            recompensaService.buscarporNome.mockResolvedValue(recompensaMock);
            await recompensaController.buscarporNome(req, res);
            (0, globals_1.expect)(recompensaService.buscarporNome).toHaveBeenCalledWith('Recompensa X');
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(recompensaMock);
        });
        (0, globals_1.it)('deve retornar erro quando recompensa não encontrada por nome', async () => {
            const req = mockRequest({}, { nome: 'Inexistente' });
            const erroMock = { id: 404, msg: 'Recompensa não encontrada' };
            recompensaService.buscarporNome.mockRejectedValue(erroMock);
            await recompensaController.buscarporNome(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 404 });
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar recompensa com sucesso e retornar status 200', async () => {
            const req = mockRequest({ nome: 'Recompensa Atualizada', valor_minimo: 75.0, quantidade_maxima: 15 }, { id: '1' });
            const recompensaAtualizadaMock = { id: 1, nome: 'Recompensa Atualizada', valor_minimo: 75.0, quantidade_maxima: 15 };
            recompensaService.atualizar.mockResolvedValue(recompensaAtualizadaMock);
            await recompensaController.atualizar(req, res);
            (0, globals_1.expect)(recompensaService.atualizar).toHaveBeenCalledWith(1, { nome: 'Recompensa Atualizada', valor_minimo: 75.0, quantidade_maxima: 15 });
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(200);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith(recompensaAtualizadaMock);
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar recompensa com sucesso e retornar status 204', async () => {
            const req = mockRequest({}, { id: '1' });
            recompensaService.deletar.mockResolvedValueOnce();
            await recompensaController.deletar(req, res);
            (0, globals_1.expect)(recompensaService.deletar).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(204);
        });
        (0, globals_1.it)('deve retornar erro ao tentar deletar recompensa inexistente', async () => {
            const req = mockRequest({}, { id: '999' });
            const erroMock = { id: 404, msg: 'Recompensa não encontrada' };
            recompensaService.deletar.mockRejectedValue(erroMock);
            await recompensaController.deletar(req, res);
            (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
            (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Recompensa não encontrada' });
        });
    });
});
