"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaService = void 0;
class CategoriaService {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    async inserir(categoria) {
        if (!categoria.nome) {
            throw ({ id: 400, msg: "O nome da categoria é obrigatório" });
        }
        else {
            return await this.categoriaRepository.save(categoria);
        }
    }
    async listar() {
        return this.categoriaRepository.find();
    }
    async buscarporId(id) {
        let categoria = await this.categoriaRepository.findOne({ where: { id } });
        if (!categoria) {
            throw { id: 400, msg: "Categoria não encontrada" };
        }
        return categoria;
    }
    async buscarporNome(nome) {
        let categoria = await this.categoriaRepository.findOne({ where: { nome } });
        if (!categoria) {
            throw { id: 400, msg: "Categoria não encontrada" };
        }
        return categoria;
    }
    async atualizar(id, categoria) {
        let categoriaexistente = await this.categoriaRepository.findOne({ where: { id } });
        if (!categoriaexistente) {
            throw { id: 400, msg: "Categoria não encontrada" };
        }
        else {
            categoriaexistente.nome = categoria.nome;
        }
        return await this.categoriaRepository.save(categoriaexistente);
    }
    async deletar(id) {
        let categoria = await this.categoriaRepository.findOne({ where: { id } });
        if (!categoria) {
            throw ({ id: 404, msg: "pessoaJuridica não encontrada" });
        }
        await this.categoriaRepository.remove(categoria);
    }
}
exports.CategoriaService = CategoriaService;
