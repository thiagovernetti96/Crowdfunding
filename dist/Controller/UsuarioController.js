"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
class UsuarioController {
    constructor(pesssoaFisicaService) {
        this.usuarioService = pesssoaFisicaService;
    }
    async inserir(req, res) {
        console.log(req.body);
        try {
            const usuario = req.body;
            const newusuario = await this.usuarioService.inserir(usuario);
            res.status(201).json(newusuario);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async listar(req, res) {
        try {
            const lista = await this.usuarioService.listar();
            res.status(200).json(lista);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const busca = await this.usuarioService.buscarporId(id);
            res.status(200).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporNome(req, res) {
        try {
            const nome = req.params.nome;
            const busca = await this.usuarioService.buscarporNome(nome);
            res.status(201).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const pessoa_fisica = req.body;
            const pessoa_fisica_atualizada = await this.usuarioService.atualizar(id, pessoa_fisica);
            res.status(200).json(pessoa_fisica_atualizada);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.usuarioService.deletar(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
}
exports.UsuarioController = UsuarioController;
