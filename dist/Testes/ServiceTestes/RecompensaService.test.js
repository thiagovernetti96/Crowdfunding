"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const RecompensaService_1 = require("../../Service/RecompensaService");
const mockRecompensaRepository = {
    save: globals_1.jest.fn(),
    find: globals_1.jest.fn(),
    findOne: globals_1.jest.fn(),
    remove: globals_1.jest.fn()
};
(0, globals_1.describe)('RecompensaService', () => {
    let recompensaService;
    let recompensaRepository;
    (0, globals_1.beforeEach)(() => {
        recompensaRepository = mockRecompensaRepository;
        recompensaService = new RecompensaService_1.RecompensaService(recompensaRepository);
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma recompensa com sucesso', async () => {
            const recompensa = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0, quantidade_maxima: 100, produto: { nome: 'Produto A' } };
            mockRecompensaRepository.save.mockReturnValueOnce(recompensa);
            const result = await recompensaService.inserir(recompensa);
            (0, globals_1.expect)(result).toEqual(recompensa);
            (0, globals_1.expect)(mockRecompensaRepository.save).toHaveBeenCalledWith(recompensa);
        });
        (0, globals_1.it)('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
            const recompensa = { id: 1, nome: '', descricao: 'Descrição da Recompensa A', valor_minimo: undefined };
            await (0, globals_1.expect)(recompensaService.inserir(recompensa))
                .rejects.toEqual({ id: 400, msg: "Nome,descrição,produto,valor mínimo e quantidade máxima são obrigatórios" });
            (0, globals_1.expect)(mockRecompensaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é undefined', async () => {
            const recompensa = { id: 1, nome: undefined, descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 };
            await (0, globals_1.expect)(recompensaService.inserir(recompensa))
                .rejects.toEqual({ id: 400, msg: "Nome,descrição,produto,valor mínimo e quantidade máxima são obrigatórios" });
            (0, globals_1.expect)(mockRecompensaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é null', async () => {
            const recompensa = { id: 1, nome: null, descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 };
            await (0, globals_1.expect)(recompensaService.inserir(recompensa))
                .rejects.toEqual({ id: 400, msg: "Nome,descrição,produto,valor mínimo e quantidade máxima são obrigatórios" });
            (0, globals_1.expect)(mockRecompensaRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar uma recompensa existente', async () => {
            const recompensa_existente = { id: 1, nome: 'Recompensa A', produto: { nome: 'Produto A' }, descricao: 'Descrição da Recompensa A', valor_minimo: 50.0, quantidade_maxima: 100 };
            const recompensa_atualizada = { id: 1, nome: 'Recompensa B', produto: { nome: 'Produto B' }, descricao: 'Descrição da Recompensa B', valor_minimo: 75.0, quantidade_maxima: 150 };
            mockRecompensaRepository.findOne.mockReturnValueOnce(recompensa_existente);
            mockRecompensaRepository.save.mockReturnValueOnce(recompensa_atualizada);
            const result = await recompensaService.atualizar(1, recompensa_atualizada);
            (0, globals_1.expect)(result).toEqual(recompensa_atualizada);
            (0, globals_1.expect)(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando a recompensa não existe', async () => {
            mockRecompensaRepository.findOne.mockReturnValueOnce(undefined);
            const recompensa_atualizada = { id: 1, nome: 'Recompensa B', descricao: 'Descrição da Recompensa B', valor_minimo: 75.0 };
            await (0, globals_1.expect)(recompensaService.atualizar(1, recompensa_atualizada))
                .rejects.toEqual({ id: 404, msg: "Recompensa não encontrada" });
            (0, globals_1.expect)(mockRecompensaRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar uma recompensa existente', async () => {
            const recompensa_existente = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0, quantidade_maxima: 100, produto: { nome: 'Produto A' } };
            mockRecompensaRepository.findOne.mockReturnValueOnce(recompensa_existente);
            await recompensaService.deletar(1);
            (0, globals_1.expect)(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockRecompensaRepository.remove).toHaveBeenCalledWith(recompensa_existente);
        });
        (0, globals_1.it)('deve lançar erro quando a recompensa não existe', async () => {
            mockRecompensaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(recompensaService.deletar(1))
                .rejects.toEqual({ id: 404, msg: "Recompensa não encontrada" });
            (0, globals_1.expect)(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockRecompensaRepository.remove).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar todas as recompensas', async () => {
            const recompensas = [
                { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 },
                { id: 2, nome: 'Recompensa B', descricao: 'Descrição da Recompensa B', valor_minimo: 75.0 }
            ];
            mockRecompensaRepository.find.mockReturnValueOnce(recompensas);
            const result = await recompensaService.listar();
            (0, globals_1.expect)(result).toEqual(recompensas);
            (0, globals_1.expect)(mockRecompensaRepository.find).toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve retornar uma recompensa existente por ID', async () => {
            const recompensa = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0 };
            mockRecompensaRepository.findOne.mockReturnValueOnce(recompensa);
            const result = await recompensaService.buscarporId(1);
            (0, globals_1.expect)(result).toEqual(recompensa);
            (0, globals_1.expect)(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando recompensa não é encontrada por ID', async () => {
            mockRecompensaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(recompensaService.buscarporId(999))
                .rejects.toEqual({ id: 404, msg: "Recompensa não encontrada" });
            (0, globals_1.expect)(mockRecompensaRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
        });
    });
    (0, globals_1.describe)('buscarPorNome', () => {
        (0, globals_1.it)('deve buscar recompensas por nome', async () => {
            const recompensa = { id: 1, nome: 'Recompensa A', descricao: 'Descrição da Recompensa A', valor_minimo: 50.0, quantidade_maxima: 100, produto: { nome: 'Produto A' } };
            mockRecompensaRepository.find.mockReturnValueOnce([recompensa]);
            const result = await recompensaService.buscarporNome('Recompensa A');
            (0, globals_1.expect)(result).toEqual([recompensa]);
            (0, globals_1.expect)(mockRecompensaRepository.find).toHaveBeenCalledWith({ where: { nome: 'Recompensa A' } });
        });
    });
});
