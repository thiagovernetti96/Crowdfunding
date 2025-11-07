"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecompensaService = void 0;
class RecompensaService {
    constructor(recompensaRepository) {
        this.recompensaRepository = recompensaRepository;
    }
    async inserir(recompensa) {
        if (!recompensa.nome || !recompensa.descricao || !recompensa.produto || !recompensa.valor_minimo || !recompensa.quantidade_maxima || !recompensa.quantidade_disponivel) {
            throw ({ id: 400, msg: "Nome,descrição,produto,valor mínimo,quantidade máxima e quantidade disponível são obrigatórios" });
        }
        else {
            return await this.recompensaRepository.save(recompensa);
        }
    }
    async listar() {
        return this.recompensaRepository.find();
    }
    async buscarporId(id) {
        let recompensa = await this.recompensaRepository.findOne({ where: { id } });
        if (!recompensa) {
            throw { id: 404, msg: "Recompensa não encontrada" };
        }
        return recompensa;
    }
    async buscarporNome(nome) {
        let recompensa = await this.recompensaRepository.findOne({ where: { nome } });
        if (!recompensa) {
            throw { id: 404, msg: "Recompensa não encontrada" };
        }
        return recompensa;
    }
    async atualizar(id, recompensa) {
        let recompensaexistente = await this.recompensaRepository.findOne({ where: { id } });
        if (!recompensaexistente) {
            throw { id: 404, msg: "Recompensa não encontrada" };
        }
        else {
            recompensaexistente.nome = recompensa.nome;
            recompensaexistente.descricao = recompensa.descricao;
            recompensaexistente.produto = recompensa.produto;
            recompensaexistente.valor_minimo = recompensa.valor_minimo;
            recompensaexistente.quantidade_maxima = recompensa.quantidade_maxima;
        }
        return await this.recompensaRepository.save(recompensaexistente);
    }
    async deletar(id) {
        let recompensa = await this.recompensaRepository.findOne({ where: { id } });
        if (!recompensa) {
            throw ({ id: 404, msg: "Recompensa não encontrada" });
        }
        await this.recompensaRepository.remove(recompensa);
    }
}
exports.RecompensaService = RecompensaService;
