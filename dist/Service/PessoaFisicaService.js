"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaFisicaService = void 0;
class PessoaFisicaService {
    constructor(pessoaFisicaRepository) {
        this.pessoaFisicaRepository = pessoaFisicaRepository;
    }
    async inserir(pessoa_fisica) {
        if (!pessoa_fisica.cpf || !pessoa_fisica.data_nascimento || !pessoa_fisica.email || !pessoa_fisica.nome || !pessoa_fisica.senha) {
            throw ({ id: 400, msg: "Todos os dados são obrigatórios" });
        }
        else {
            return await this.pessoaFisicaRepository.save(pessoa_fisica);
        }
    }
    async buscarporId(id) {
        let pessoa_fisica = await this.pessoaFisicaRepository.findOne({ where: { id } });
        if (!pessoa_fisica) {
            throw { id: 404, msg: "Pessoa não encontrada" };
        }
        else {
            return pessoa_fisica;
        }
    }
    async buscarporNome(nome) {
        let pessoa_fisica = await this.pessoaFisicaRepository.findOne({ where: { nome } });
        if (!pessoa_fisica) {
            throw { id: 404, msg: "Pessoa não encontrada" };
        }
        else {
            return pessoa_fisica;
        }
    }
    async listar() {
        return this.pessoaFisicaRepository.find();
    }
    async atualizar(id, pessoa_fisica) {
        let pessoa_fisica_existente = await this.pessoaFisicaRepository.findOne({ where: { id } });
        if (!pessoa_fisica_existente) {
            throw { id: 404, msg: "Pessoa não encontrada" };
        }
        else {
            pessoa_fisica_existente.cpf = pessoa_fisica.cpf;
            pessoa_fisica_existente.data_nascimento = pessoa_fisica.data_nascimento;
            pessoa_fisica_existente.email = pessoa_fisica.email;
            pessoa_fisica_existente.nome = pessoa_fisica.nome;
            pessoa_fisica_existente.senha = pessoa_fisica.senha;
        }
        return await this.pessoaFisicaRepository.save(pessoa_fisica_existente);
    }
    async deletar(id) {
        let pessoa_fisica = await this.pessoaFisicaRepository.findOne({ where: { id } });
        if (!pessoa_fisica) {
            throw { id: 404, msg: "Pessoa não encontrada" };
        }
        else {
            await this.pessoaFisicaRepository.remove(pessoa_fisica);
        }
    }
}
exports.PessoaFisicaService = PessoaFisicaService;
