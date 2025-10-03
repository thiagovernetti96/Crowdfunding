"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const pessoa_fisica_1 = require("../Model/pessoa_fisica");
const jsonwebtoken_1 = require("jsonwebtoken");
const SECRET = "Sen@c2025";
class LoginService {
    constructor(repository) {
        this.repository = repository;
    }
    async verificarLogin(email, senha) {
        const usuario = await this.repository.findOne({
            where: { email }
        });
        if (usuario && usuario.senha === senha) {
            const tipo = usuario instanceof pessoa_fisica_1.PessoaFisica ? 'fisica' : 'juridica';
            const token = (0, jsonwebtoken_1.sign)({
                usuarioId: usuario.id,
                usuarioEmail: usuario.email,
                tipoUsuario: tipo
            }, SECRET, { expiresIn: '1h' });
            return token;
        }
        throw ({ id: 401, msg: "Usuário ou senha inválidos" });
    }
    async validarToken(token) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, SECRET);
            if (!payload || !payload.usuarioId) {
                throw ({ id: 401, msg: "Token Inválido" });
            }
            return {
                id: payload.usuarioId,
                email: payload.usuarioEmail,
                tipo: payload.tipoUsuario
            };
        }
        catch (err) {
            console.log(err);
            throw ({ id: 401, msg: "Token Inválido" });
        }
    }
}
exports.LoginService = LoginService;
