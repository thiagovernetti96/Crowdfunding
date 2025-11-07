"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
class LoginController {
    constructor(service) {
        this.realizarLogin = async (req, res) => {
            const { email, senha } = req.body;
            try {
                const { token, nome } = await this.service.verificarLogin(email, senha);
                res.status(201).json({ token, nome });
            }
            catch (err) {
                res.status(err.id).json({ error: err.msg });
            }
        };
        this.service = service;
    }
}
exports.LoginController = LoginController;
