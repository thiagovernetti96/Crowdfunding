"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApoioRouter = void 0;
const express_1 = require("express");
const ApoioRouter = (controller) => {
    const router = (0, express_1.Router)();
    router.post('/', (req, res) => controller.criar(req, res));
    router.get('/:id/status', (req, res) => controller.status(req, res));
    return router;
};
exports.ApoioRouter = ApoioRouter;
