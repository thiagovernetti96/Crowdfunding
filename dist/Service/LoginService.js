"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const SECRET = "Sen@c2025";
class LoginService {
    constructor(repository) {
        this.repository = repository;
    }
    async verificarLogin(email, senha) {
        let usuario = await this.repository.findOneBy({ email: email });
        if (usuario && usuario.senha == senha) {
            let token = (0, jsonwebtoken_1.sign)({
                usuarioId: usuario.id,
                usuarioEmail: usuario.email
            }, SECRET, { expiresIn: '1h' });
            return token;
        }
        throw ({ id: 401, msg: "Usuario ou senha invalidos" });
    }
    async validarToken(token) {
        try {
            console.log("Token ", token);
            const payload = (0, jsonwebtoken_1.verify)(token, SECRET);
            if (!payload) {
                throw ({ id: 401, msg: "Token Invalido" });
            }
            return;
        }
        catch (err) {
            console.log(err);
            throw ({ id: 401, msg: "Token Invalido" });
        }
    }
}
exports.LoginService = LoginService;
