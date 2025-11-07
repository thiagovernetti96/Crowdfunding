"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApoioRouter = void 0;
const express_1 = require("express");
const ApoioRouter = (controller, tokenMiddleware) => {
    const router = (0, express_1.Router)();
    // Aplica o middleware apenas nas rotas que precisam de autenticação
    router.post('/', (req, res) => controller.criar(req, res));
    router.get('/:id/status', (req, res) => controller.status(req, res));
    router.post("/:id/simular", (req, res) => controller.simularPagamento(req, res));
    // Webhook não precisa de autenticação
    router.post("/webhook/pix", (req, res) => controller.webhook(req, res));
    return router;
};
exports.ApoioRouter = ApoioRouter;
