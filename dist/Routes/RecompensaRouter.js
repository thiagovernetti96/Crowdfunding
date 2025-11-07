"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecompensaRouter = void 0;
const express_1 = require("express");
const RecompensaRouter = (controller) => {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => controller.listar(req, res));
    router.get('/:id', (req, res) => controller.buscarporId(req, res));
    router.post('/', (req, res) => controller.inserir(req, res));
    router.put('/:id', (req, res) => controller.atualizar(req, res));
    router.delete('/:id', (req, res) => controller.deletar(req, res));
    return router;
};
exports.RecompensaRouter = RecompensaRouter;
