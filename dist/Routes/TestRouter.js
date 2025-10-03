"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRouter = void 0;
const express_1 = require("express");
exports.TestRouter = (0, express_1.Router)();
exports.TestRouter.post('/', (req, res) => {
    res.json({ msg: "rota teste funcionando" });
});
