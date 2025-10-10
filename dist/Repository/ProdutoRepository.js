"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoRepository = void 0;
class ProdutoRepository {
    constructor() {
        this.Produtos = [];
        this.CounterId = 1;
    }
    adicionar(produto) {
        const newProduto = {
            id: this.CounterId++,
            nome: produto.nome,
            descricao: produto.descricao,
            valor_meta: produto.valor_meta,
            criador: produto.criador,
            categoria: produto.categoria,
            imagem_capa: produto.imagem_capa || '',
            valor_arrecadad0o: produto.valor_arrecadado || 0
        };
        this.Produtos.push(newProduto);
        return newProduto;
    }
    listar() {
        return this.Produtos;
    }
    buscarporId(id) {
        return this.Produtos.find(pro => pro.id === id);
    }
    buscarporNome(nome) {
        return this.Produtos.find(pro => pro.nome === nome);
    }
    atualizar(id, produto) {
        const index = this.Produtos.findIndex(pro => pro.id === id);
        if (index == -1)
            return undefined;
        const produtoAtualizado = {
            id,
            ...produto
        };
        this.Produtos[index] = produtoAtualizado;
        return produtoAtualizado;
    }
    deletar(id) {
        const index = this.Produtos.findIndex(pro => pro.id === id);
        if (index !== -1) {
            this.Produtos.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.ProdutoRepository = ProdutoRepository;
