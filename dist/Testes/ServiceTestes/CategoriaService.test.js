"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaService_1 = require("../../Service/CategoriaService");
const globals_1 = require("@jest/globals");
const mockCategoriaRepository = {
    save: globals_1.jest.fn(),
    find: globals_1.jest.fn(),
    findOne: globals_1.jest.fn(),
    remove: globals_1.jest.fn()
};
(0, globals_1.describe)('CategoriaService', () => {
    let categoriaService;
    let categoriaRepository;
    (0, globals_1.beforeEach)(() => {
        categoriaRepository = mockCategoriaRepository;
        categoriaService = new CategoriaService_1.CategoriaService(categoriaRepository);
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir uma categoria com sucesso', async () => {
            const categoria = { id: 1, nome: 'Electrónicos' };
            mockCategoriaRepository.save.mockReturnValueOnce(categoria);
            const result = await categoriaService.inserir(categoria);
            (0, globals_1.expect)(result).toEqual(categoria);
            (0, globals_1.expect)(mockCategoriaRepository.save).toHaveBeenCalledWith(categoria);
        });
        (0, globals_1.it)('deve lançar erro quando nome não é fornecido', async () => {
            const categoria = { id: 1, nome: '' };
            await (0, globals_1.expect)(categoriaService.inserir(categoria))
                .rejects.toEqual({ id: 400, msg: "O nome da categoria é obrigatório" });
            (0, globals_1.expect)(mockCategoriaRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é undefined', async () => {
            const categoria = { id: 1, nome: undefined };
            await (0, globals_1.expect)(categoriaService.inserir(categoria))
                .rejects.toEqual({ id: 400, msg: "O nome da categoria é obrigatório" });
        });
        (0, globals_1.it)('deve lançar erro quando nome é null', async () => {
            const categoria = { id: 1, nome: null };
            await (0, globals_1.expect)(categoriaService.inserir(categoria))
                .rejects.toEqual({ id: 400, msg: "O nome da categoria é obrigatório" });
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve retornar lista de categorias', async () => {
            const categorias = [
                { id: 1, nome: 'Electrónicos' },
                { id: 2, nome: 'Roupas' }
            ];
            mockCategoriaRepository.find.mockReturnValueOnce(categorias);
            const result = await categoriaService.listar();
            (0, globals_1.expect)(result).toEqual(categorias);
            (0, globals_1.expect)(mockCategoriaRepository.find).toHaveBeenCalled();
        });
        (0, globals_1.it)('deve retornar array vazio quando não há categorias', async () => {
            mockCategoriaRepository.find.mockReturnValueOnce([]);
            const result = await categoriaService.listar();
            (0, globals_1.expect)(result).toEqual([]);
        });
    });
    (0, globals_1.describe)('buscarporId', () => {
        (0, globals_1.it)('deve retornar categoria quando encontrada', async () => {
            const categoria = { id: 1, nome: 'Electrónicos' };
            mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
            const result = await categoriaService.buscarporId(1);
            (0, globals_1.expect)(result).toEqual(categoria);
            (0, globals_1.expect)(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando categoria não é encontrada', async () => {
            mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(categoriaService.buscarporId(999))
                .rejects.toEqual({ id: 400, msg: "Categoria não encontrada" });
        });
    });
    (0, globals_1.describe)('buscarporNome', () => {
        (0, globals_1.it)('deve retornar categoria quando encontrada por nome', async () => {
            const categoria = { id: 1, nome: 'Electrónicos' };
            mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
            const result = await categoriaService.buscarporNome('Electrónicos');
            (0, globals_1.expect)(result).toEqual(categoria);
            (0, globals_1.expect)(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { nome: 'Electrónicos' } });
        });
        (0, globals_1.it)('deve lançar erro quando categoria não é encontrada por nome', async () => {
            mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(categoriaService.buscarporNome('Inexistente'))
                .rejects.toEqual({ id: 400, msg: "Categoria não encontrada" });
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar categoria com sucesso', async () => {
            const categoriaExistente = { id: 1, nome: 'Electrónicos' };
            mockCategoriaRepository.findOne.mockReturnValueOnce(categoriaExistente);
            const categoriaAtualizada = { id: 1, nome: 'Eletrodomésticos' };
            mockCategoriaRepository.save.mockReturnValueOnce(categoriaAtualizada);
            const result = await categoriaService.atualizar(1, categoriaAtualizada);
            (0, globals_1.expect)(result).toEqual({ id: 1, nome: 'Eletrodomésticos' });
            (0, globals_1.expect)(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro ao tentar atualizar categoria inexistente', async () => {
            mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);
            const categoriaAtualizada = { id: 999, nome: 'Inexistente' };
            await (0, globals_1.expect)(categoriaService.atualizar(999, categoriaAtualizada))
                .rejects.toEqual({ id: 400, msg: "Categoria não encontrada" });
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar categoria com sucesso', async () => {
            // Arrange
            const categoria = { id: 1, nome: 'Electrónicos' };
            mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
            mockCategoriaRepository.remove.mockReturnValueOnce(undefined);
            await categoriaService.deletar(1);
            (0, globals_1.expect)(mockCategoriaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(mockCategoriaRepository.remove).toHaveBeenCalledWith(categoria);
        });
        (0, globals_1.it)('deve lançar erro ao tentar deletar categoria inexistente', async () => {
            mockCategoriaRepository.findOne.mockReturnValueOnce(undefined);
            await (0, globals_1.expect)(categoriaService.deletar(999))
                .rejects.toEqual({ id: 404, msg: "pessoaJuridica não encontrada" });
        });
        (0, globals_1.it)('deve verificar se remove foi chamado com a categoria correta', async () => {
            const categoria = { id: 1, nome: 'Electrónicos' };
            mockCategoriaRepository.findOne.mockReturnValueOnce(categoria);
            await categoriaService.deletar(1);
            (0, globals_1.expect)(mockCategoriaRepository.remove).toHaveBeenCalledWith(categoria);
        });
    });
});
