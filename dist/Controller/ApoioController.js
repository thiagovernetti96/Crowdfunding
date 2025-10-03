"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApoioController = void 0;
const ApoioService_1 = require("../Service/ApoioService");
class ApoioController {
    async criar(req, res) {
        try {
            const { produto, apoiadorPessoaFisica, apoiadorPessoaJuridica, recompensa, valor } = req.body;
            const result = await ApoioService_1.ApoioService.criarApoio({ produto, apoiadorPessoaFisica, apoiadorPessoaJuridica, recompensa, valor });
            res.status(201).json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async status(req, res) {
        try {
            const { id } = req.params;
            const apoio = await ApoioService_1.ApoioService.verificarStatus(Number(id));
            res.json(apoio);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
exports.ApoioController = ApoioController;
