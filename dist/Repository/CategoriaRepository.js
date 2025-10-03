"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepository = void 0;
class CategoriaRepository {
    constructor() {
        this.categorias = [];
        this.idCounter = 1;
    }
    inserir(categoria) {
        const newCategoria = {
            id: this.idCounter++,
            nome: categoria.nome
        };
        this.categorias.push(newCategoria);
        return newCategoria;
    }
    listar() {
        return this.categorias;
    }
    buscarporId(id) {
        return this.categorias.find(c => c.id === id);
    }
    buscarporNome(nome) {
        return this.categorias.find(c => c.nome === nome);
    }
    atualizar(id, Categoria) {
        const index = this.categorias.findIndex(c => c.id === id);
        if (index === -1)
            return undefined;
        const categoriaAtualizada = {
            id,
            nome: Categoria.nome,
        };
        this.categorias[index] = categoriaAtualizada;
        return categoriaAtualizada;
    }
    deletar(id) {
        const index = this.categorias.findIndex(categoria => categoria.id === id);
        if (index !== -1) {
            this.categorias.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.CategoriaRepository = CategoriaRepository;
