"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecompensaRepository = void 0;
class RecompensaRepository {
    constructor() {
        this.Recompensas = [];
        this.CounterId = 1;
    }
    inserir(id, recompensa) {
        const newRecompensa = {
            id: this.CounterId++,
            nome: recompensa.nome,
            descricao: recompensa.descricao,
            valor_minimo: recompensa.valor_minimo,
            quantidade_maxima: recompensa.quantidade_maxima,
            quantidade_disponivel: recompensa.quantidade_disponivel,
            produto: recompensa.produto
        };
        this.Recompensas.push(newRecompensa);
        return newRecompensa;
    }
    listar() {
        return this.Recompensas;
    }
    buscarporId(id) {
        return this.Recompensas.find(re => re.id === id);
    }
    buscarporNome(nome) {
        return this.Recompensas.find(Recompensa => Recompensa.nome === nome);
    }
    atualizar(id, recompensa) {
        const index = this.Recompensas.findIndex(re => re.id === id);
        if (index == -1)
            return undefined;
        const recompensaAtualizada = {
            id,
            ...recompensa
        };
        this.Recompensas[index] = recompensaAtualizada;
        return recompensaAtualizada;
    }
    deletar(id) {
        const index = this.Recompensas.findIndex(re => re.id === id);
        if (index !== -1) {
            this.Recompensas.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.RecompensaRepository = RecompensaRepository;
