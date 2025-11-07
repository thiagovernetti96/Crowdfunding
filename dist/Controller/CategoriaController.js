"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
class CategoriaController {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
    }
    async inserir(req, res) {
        try {
            const categoria = req.body;
            const newCategoria = await this.categoriaService.inserir(categoria);
            res.status(201).json(newCategoria);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async listar(req, res) {
        try {
            const categorias = await this.categoriaService.listar();
            res.status(200).json(categorias);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const categoria = await this.categoriaService.buscarporId(id);
            res.status(200).json(categoria);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporNome(req, res) {
        try {
            const nome = req.params.nome;
            const categoria = await this.categoriaService.buscarporNome(nome);
            res.status(200).json(categoria);
        }
        catch (err) {
            res.status(err.id).json({ message: err.id });
        }
    }
    async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nome } = req.body;
            const categoriaAtualizada = await this.categoriaService.atualizar(id, { nome });
            res.status(200).json(categoriaAtualizada);
        }
        catch (err) {
            const statusCode = err.id || 500;
            const mensagem = err.msg || "Erro ao atualizar categoria.";
            res.status(statusCode).json({ message: mensagem });
        }
    }
    async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.categoriaService.deletar(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
}
exports.CategoriaController = CategoriaController;
