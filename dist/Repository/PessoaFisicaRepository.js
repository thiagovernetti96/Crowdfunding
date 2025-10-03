"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaFisicaRepository = void 0;
const pessoa_fisica_1 = require("../Model/pessoa_fisica");
class PessoaFisicaRepository {
    constructor() {
        this.pessoasFisicas = [];
        this.idCounter = 1;
    }
    inserir(pessoafisica) {
        const newPessoaFisica = {
            id: this.idCounter++,
            ...pessoafisica
        };
        this.pessoasFisicas.push(newPessoaFisica);
        return newPessoaFisica;
    }
    listar() {
        return this.pessoasFisicas;
    }
    buscarporId(id) {
        return this.pessoasFisicas.find(pf => pf.id === id);
    }
    buscarporNome(nome) {
        return this.pessoasFisicas.find(pf => pf.nome === nome);
    }
    atualizar(id, pessoafisica) {
        const index = this.pessoasFisicas.findIndex(pf => pf.id === id);
        if (index === -1)
            return undefined;
        const pessoaFisicaAtualizada = {
            id,
            ...pessoa_fisica_1.PessoaFisica
        };
        this.pessoasFisicas[index] = pessoaFisicaAtualizada;
        return pessoaFisicaAtualizada;
    }
    deletar(id) {
        const index = this.pessoasFisicas.findIndex(pf => pf.id === id);
        if (index !== -1) {
            this.pessoasFisicas.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.PessoaFisicaRepository = PessoaFisicaRepository;
