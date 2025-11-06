"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoController = void 0;
const multer_1 = __importDefault(require("../Config/multer"));
class ProdutoController {
    constructor(produtoService) {
        this.uploadImage = multer_1.default.single('imagem_capa');
        this.produtoService = produtoService;
    }
    async inserir(req, res) {
        try {
            console.log("REQUEST BODY:", req.body);
            console.log("FILE:", req.file);
            const { nome, descricao, valor_meta, categoriaId, criadorId } = req.body;
            let imagemFilename = undefined;
            if (req.file) {
                imagemFilename = req.file.filename;
            }
            const produtoData = {
                nome,
                descricao,
                valor_meta: parseFloat(valor_meta),
                categoria: { id: parseInt(categoriaId) },
                criador: { id: parseInt(criadorId) }
            };
            const newProduto = await this.produtoService.inserir(produtoData, imagemFilename);
            res.status(201).json(newProduto);
        }
        catch (err) {
            console.error("ERROR:", err);
            const statusCode = err.id || 500;
            res.status(statusCode).json({
                message: err.msg || err.message || "Erro",
                detalhes: err.detalhes || null
            });
        }
    }
    async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nome, descricao, valor_meta, categoriaId } = req.body;
            let imagemFilename = undefined;
            if (req.file) {
                imagemFilename = req.file.filename;
            }
            const produtoData = {
                nome,
                descricao,
                valor_meta: parseFloat(valor_meta),
                categoria: { id: parseInt(categoriaId) }
            };
            const produtoAtualizado = await this.produtoService.atualizar(id, produtoData, imagemFilename);
            res.status(200).json(produtoAtualizado);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async listar(req, res) {
        try {
            const lista = await this.produtoService.listar();
            res.status(200).json(lista);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const busca = await this.produtoService.buscarporId(id);
            res.status(200).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporNome(req, res) {
        try {
            const nome = req.params.nome;
            const busca = await this.produtoService.buscarporNome(nome);
            res.status(200).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarPorCriador(req, res) {
        try {
            const nomeCriador = req.params.nomeCriador;
            const busca = await this.produtoService.buscarPorCriador(nomeCriador);
            res.status(200).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.produtoService.deletar(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async listarComArrecadacao(req, res) {
        try {
            const produtos = await this.produtoService.getProductsWithTotalArrecadado();
            res.json(produtos);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    }
    async obterPorIdComArrecadacao(req, res) {
        try {
            const { id } = req.params;
            const produto = await this.produtoService.getProductWithTotalArrecadadoById(Number(id));
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.json(produto);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }
    async buscarPorCriadorComArrecadacao(req, res) {
        try {
            const { nome } = req.params;
            const produtos = await this.produtoService.getProductsByCreatorWithTotalArrecadado(nome);
            res.json(produtos);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos do criador' });
        }
    }
}
exports.ProdutoController = ProdutoController;
