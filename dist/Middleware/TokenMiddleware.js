"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
class TokenMiddleware {
    constructor(service) {
        this.service = service;
    }
    async verificarAcesso(req, res, next) {
        let token = req.get("Token");
        if (req.path.startsWith('/uploads/')) {
            return next();
        }
        if (req.path === '/api/login' || req.path.startsWith('/api/categoria')) {
            return next();
        }
        if (!token) {
            res.status(401).json({ error: "Nenhum token informado!" });
        }
        else {
            try {
                console.log("Validar Token ", token);
                this.service.validarToken(token);
                console.log("Token validado!");
                next();
            }
            catch (err) {
                console.log(err);
                res.status(err.id).json({ error: err.msg });
            }
        }
    }
}
exports.TokenMiddleware = TokenMiddleware;
