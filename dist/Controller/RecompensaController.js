"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecompensaController = void 0;
class RecompensaController {
    constructor(recompensaService) {
        this.recompensaService = recompensaService;
    }
    async inserir(req, res) {
        try {
            console.log("Dados recebidos:", req.body);
            const recompensa = req.body;
            const newRecompensa = await this.recompensaService.inserir(recompensa);
            res.status(201).json(newRecompensa);
        }
        catch (err) {
            console.error("ERROR:", err);
            const statusCode = err.id || 500;
            res.status(statusCode).json({
                message: err.msg || err.message || "Erro"
            });
        }
    }
    async listar(req, res) {
        try {
            const lista = await this.recompensaService.listar();
            res.status(200).json(lista);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const busca = await this.recompensaService.buscarporId(id);
            res.status(201).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporNome(req, res) {
        try {
            const nome = req.params.nome;
            const busca = await this.recompensaService.buscarporNome(nome);
            res.status(201).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const recompensa = req.body;
            const recompensaAtualizada = await this.recompensaService.atualizar(id, recompensa);
            res.status(200).json(recompensaAtualizada);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.recompensaService.deletar(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
}
exports.RecompensaController = RecompensaController;
