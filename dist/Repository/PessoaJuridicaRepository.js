"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaJuridicaRepository = void 0;
class PessoaJuridicaRepository {
    constructor() {
        this.PessoasJuridicas = [];
        this.CounterId = 1;
    }
    inserir(id, pessoa_juridica) {
        const newPessoaJuridica = {
            id: this.CounterId++,
            ...pessoa_juridica
        };
        this.PessoasJuridicas.push(newPessoaJuridica);
        return newPessoaJuridica;
    }
    listar() {
        return this.PessoasJuridicas;
    }
    buscarporId(id) {
        return this.PessoasJuridicas.find(pj => pj.id === id);
    }
    buscarporNome(nome) {
        return this.PessoasJuridicas.find(pj => pj.nome === nome);
    }
    atualizar(id, pessoa_juridica) {
        const index = this.PessoasJuridicas.findIndex(pj => pj.id === id);
        if (index == -1)
            return undefined;
        const pessoaJuridicaAtualizada = {
            id,
            ...pessoa_juridica
        };
        this.PessoasJuridicas[index] = pessoaJuridicaAtualizada;
        return pessoaJuridicaAtualizada;
    }
    deletar(id) {
        const index = this.PessoasJuridicas.findIndex(pj => pj.id === id);
        if (index !== -1) {
            this.PessoasJuridicas.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.PessoaJuridicaRepository = PessoaJuridicaRepository;
