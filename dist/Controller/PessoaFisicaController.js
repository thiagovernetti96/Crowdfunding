"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaFisicaController = void 0;
class PessoaFisicaController {
    constructor(pesssoaFisicaService) {
        this.pessoaFisicaService = pesssoaFisicaService;
    }
    async inserir(req, res) {
        console.log(req.body);
        try {
            const pessoa_fisica = req.body;
            const newPessoaFisica = await this.pessoaFisicaService.inserir(pessoa_fisica);
            res.status(201).json(newPessoaFisica);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async listar(req, res) {
        try {
            const lista = await this.pessoaFisicaService.listar();
            res.status(200).json(lista);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const busca = await this.pessoaFisicaService.buscarporId(id);
            res.status(200).json(busca);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async buscarporNome(req, res) {
        try {
            const nome = req.params.nome;
            const busca = await this.pessoaFisicaService.buscarporNome(nome);
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
            const pessoa_fisica_atualizada = await this.pessoaFisicaService.atualizar(id, pessoa_fisica);
            res.status(200).json(pessoa_fisica_atualizada);
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
    async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.pessoaFisicaService.deletar(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(err.id).json({ message: err.msg });
        }
    }
}
exports.PessoaFisicaController = PessoaFisicaController;
