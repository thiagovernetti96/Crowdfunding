"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ProdutoService_1 = require("../../Service/ProdutoService");
const produtoMockRepository = {
    save: globals_1.jest.fn(),
    find: globals_1.jest.fn(),
    findOne: globals_1.jest.fn(),
    remove: globals_1.jest.fn()
};
(0, globals_1.describe)('ProdutoService', () => {
    let produtoService;
    let produtoRepository;
    (0, globals_1.beforeEach)(() => {
        produtoRepository = produtoMockRepository;
        produtoService = new ProdutoService_1.ProdutoService(produtoRepository);
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('inserir', () => {
        (0, globals_1.it)('deve inserir um produto com sucesso', async () => {
            const produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 }, criadorPessoaFisica: { id: 1 } };
            produtoMockRepository.save.mockReturnValueOnce(produto);
            const result = await produtoService.inserir(produto);
            (0, globals_1.expect)(result).toEqual(produto);
            (0, globals_1.expect)(produtoMockRepository.save).toHaveBeenCalledWith(produto);
        });
        (0, globals_1.it)('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
            const produto = { id: 1, nome: '', descricao: 'Descrição do Produto A', valor_meta: undefined, categoria: { id: 1 } };
            await (0, globals_1.expect)(produtoService.inserir(produto))
                .rejects.toEqual({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
            (0, globals_1.expect)(produtoMockRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é undefined', async () => {
            const produto = { id: 1, nome: undefined, descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            await (0, globals_1.expect)(produtoService.inserir(produto))
                .rejects.toEqual({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
            (0, globals_1.expect)(produtoMockRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando nome é null', async () => {
            const produto = { id: 1, nome: null, descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            await (0, globals_1.expect)(produtoService.inserir(produto))
                .rejects.toEqual({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
            (0, globals_1.expect)(produtoMockRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('atualizar', () => {
        (0, globals_1.it)('deve atualizar um produto existente', async () => {
            const produto_existente = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            const produto_atualizado = { id: 1, nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } };
            produtoMockRepository.findOne.mockReturnValueOnce(produto_existente);
            produtoMockRepository.save.mockReturnValueOnce(produto_atualizado);
            const result = await produtoService.atualizar(1, produto_atualizado);
            (0, globals_1.expect)(result).toEqual(produto_atualizado);
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(produtoMockRepository.save).toHaveBeenCalledWith(produto_atualizado);
        });
        (0, globals_1.it)('deve lançar erro quando o produto não existe', async () => {
            produtoMockRepository.findOne.mockReturnValueOnce(undefined);
            const produto_atualizado = { id: 1, nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } };
            await (0, globals_1.expect)(produtoService.atualizar(1, produto_atualizado))
                .rejects.toEqual({ id: 404, msg: "Produto não encontrado" });
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(produtoMockRepository.save).not.toHaveBeenCalled();
        });
        (0, globals_1.it)('deve lançar erro quando dados obrigatórios não são fornecidos', async () => {
            const produto_existente = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            const produto_atualizado = { id: 1, nome: '', descricao: 'Descrição do Produto B', valor_meta: undefined, categoria: { id: 2 } };
            produtoMockRepository.findOne.mockReturnValueOnce(produto_existente);
            await (0, globals_1.expect)(produtoService.atualizar(1, produto_atualizado))
                .rejects.toEqual({ id: 400, msg: "Nome, descrição, preço e categoriaId são obrigatórios" });
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(produtoMockRepository.save).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('deletar', () => {
        (0, globals_1.it)('deve deletar um produto existente', async () => {
            const produto_existente = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 }, criadorPessoaJuridica: { id: 1 } };
            produtoMockRepository.findOne.mockReturnValueOnce(produto_existente);
            const result = await produtoService.deletar(1);
            (0, globals_1.expect)(result).toEqual(produto_existente);
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(produtoMockRepository.remove).toHaveBeenCalledWith(produto_existente);
        });
        (0, globals_1.it)('deve lançar erro quando o produto não existe', async () => {
            produtoMockRepository.findOne.mockReturnValueOnce(null);
            await (0, globals_1.expect)(produtoService.deletar(1))
                .rejects.toEqual({ id: 404, msg: "Produto não encontrado" });
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            (0, globals_1.expect)(produtoMockRepository.remove).not.toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('listar', () => {
        (0, globals_1.it)('deve listar todos os produtos', async () => {
            const produtos = [
                { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } },
                { id: 2, nome: 'Produto B', descricao: 'Descrição do Produto B', valor_meta: 150.0, categoria: { id: 2 } }
            ];
            produtoMockRepository.find.mockReturnValueOnce(produtos);
            const result = await produtoService.listar();
            (0, globals_1.expect)(result).toEqual(produtos);
            (0, globals_1.expect)(produtoMockRepository.find).toHaveBeenCalled();
        });
    });
    (0, globals_1.describe)('buscarPorId', () => {
        (0, globals_1.it)('deve buscar um produto por ID', async () => {
            const produto = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            produtoMockRepository.findOne.mockReturnValueOnce(produto);
            const result = await produtoService.buscarporId(1);
            (0, globals_1.expect)(result).toEqual(produto);
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        (0, globals_1.it)('deve lançar erro quando o produto não é encontrado', async () => {
            produtoMockRepository.findOne.mockReturnValueOnce(null);
            await (0, globals_1.expect)(produtoService.buscarporId(1))
                .rejects.toEqual({ id: 404, msg: "Produto não encontrado" });
            (0, globals_1.expect)(produtoMockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });
    (0, globals_1.describe)('buscarPorNome', () => {
        (0, globals_1.it)('deve buscar produtos por nome', async () => {
            const produtos = { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', valor_meta: 100.0, categoria: { id: 1 } };
            produtoMockRepository.find.mockReturnValueOnce(produtos);
            const result = await produtoService.buscarporNome('Produto A');
            (0, globals_1.expect)(result).toEqual(produtos);
            (0, globals_1.expect)(produtoMockRepository.find).toHaveBeenCalledWith({ where: { nome: 'Produto A' } });
        });
    });
});
