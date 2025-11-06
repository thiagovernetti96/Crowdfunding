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
        const usuario = await this.repository.findOneBy({ email });
        if (usuario && usuario.senha === senha) {
            const token = (0, jsonwebtoken_1.sign)({
                usuarioId: usuario.id,
                usuarioEmail: usuario.email,
            }, SECRET, { expiresIn: "1h" });
            // 🔹 agora retornamos também o nome do usuário
            const nome = usuario.nome ?? "";
            return { token, nome };
        }
        throw { id: 401, msg: "Usuário ou senha inválidos" };
    }
    async validarToken(token) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, SECRET);
            if (!payload) {
                throw { id: 401, msg: "Token inválido" };
            }
            return;
        }
        catch (err) {
            console.log(err);
            throw { id: 401, msg: "Token inválido" };
        }
    }
}
exports.LoginService = LoginService;
