"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaJuridicaService = void 0;
class PessoaJuridicaService {
    constructor(pessoaJuridicaRepository) {
        this.pessoaJuridicaRepository = pessoaJuridicaRepository;
    }
    async inserir(pessoa_juridica) {
        if (!pessoa_juridica.cnpj || !pessoa_juridica.email || !pessoa_juridica.razao_social
            || !pessoa_juridica.email || !pessoa_juridica.senha || !pessoa_juridica.nome) {
            throw ({ id: 400, msg: "Todos os dados são obrigatórios" });
        }
        else {
            return await this.pessoaJuridicaRepository.save(pessoa_juridica);
        }
    }
    async listar() {
        return this.pessoaJuridicaRepository.find();
    }
    async buscarporId(id) {
        let pessoa_juridica = await this.pessoaJuridicaRepository.findOne({ where: { id } });
        if (!pessoa_juridica) {
            throw ({ id: 404, msg: "Pessoa jurídica não encontrada" });
        }
        return pessoa_juridica;
    }
    async buscarporNome(nome) {
        let pessoa_juridica = await this.pessoaJuridicaRepository.findOne({ where: { nome } });
        if (!pessoa_juridica) {
            throw ({ id: 404, msg: "Pessoa Jurídica não encontrada" });
        }
        return pessoa_juridica;
    }
    async atualizar(id, pessoa_juridica) {
        let pessoa_juridica_existente = await this.pessoaJuridicaRepository.findOne({ where: { id } });
        if (!pessoa_juridica_existente) {
            throw ({ id: 404, msg: "Pessoa jurídica não encontrada" });
        }
        else {
            pessoa_juridica_existente.cnpj = pessoa_juridica.cnpj;
            pessoa_juridica_existente.email = pessoa_juridica.email;
            pessoa_juridica_existente.nome = pessoa_juridica.nome;
            pessoa_juridica_existente.senha = pessoa_juridica.senha;
            pessoa_juridica_existente.razao_social = pessoa_juridica.razao_social;
        }
        return await this.pessoaJuridicaRepository.save(pessoa_juridica_existente);
    }
    async deletar(id) {
        let pessoa_juridica = await this.pessoaJuridicaRepository.findOne({ where: { id } });
        if (!pessoa_juridica) {
            throw ({ id: 404, msg: "Pessoa jurídica não encontrada" });
        }
        await this.pessoaJuridicaRepository.remove(pessoa_juridica);
    }
}
exports.PessoaJuridicaService = PessoaJuridicaService;
