"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoRepository = void 0;
class ProdutoRepository {
    constructor() {
        this.Produtos = [];
        this.CounterId = 1;
    }
    adicionar(produto, imagemFilename) {
        const newProduto = {
            id: this.CounterId++,
            nome: produto.nome,
            descricao: produto.descricao,
            valor_meta: produto.valor_meta,
            criador: produto.criador,
            categoria: produto.categoria,
            imagem_capa: produto.imagem_capa || '',
            imagem_capa_filename: produto.imagem_capa_filename ?? undefined,
            valor_arrecadado: produto.valor_arrecadado || 0,
            updateImagePath: produto.updateImagePath // Adiciona a propriedade obrigatória
        };
        // Se temos filename, gera a URL completa
        if (imagemFilename) {
            newProduto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${imagemFilename}`;
        }
        this.Produtos.push(newProduto);
        return newProduto;
    }
    listar() {
        // Processa cada produto para garantir que as imagens tenham URL correta
        return this.Produtos.map(produto => {
            if (produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
                produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
            }
            return produto;
        });
    }
    buscarporId(id) {
        const produto = this.Produtos.find(pro => pro.id === id);
        if (produto && produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
            produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
        }
        return produto;
    }
    buscarporCriador(nomeCriador) {
        const produtos = this.Produtos.filter(pro => pro.criador === nomeCriador);
        return produtos.map(produto => {
            if (produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
                produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
            }
            return produto;
        });
    }
    buscarporNome(nome) {
        const produto = this.Produtos.find(pro => pro.nome === nome);
        if (produto && produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
            produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
        }
        return produto;
    }
    atualizar(id, produto, imagemFilename) {
        const index = this.Produtos.findIndex(pro => pro.id === id);
        if (index == -1)
            return undefined;
        const produtoAtualizado = {
            id,
            ...produto,
            imagem_capa_filename: imagemFilename || this.Produtos[index].imagem_capa_filename
        };
        // Atualiza a URL da imagem se temos filename
        if (imagemFilename) {
            produtoAtualizado.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${imagemFilename}`;
        }
        else if (produtoAtualizado.imagem_capa_filename && !produtoAtualizado.imagem_capa?.includes('/uploads/')) {
            produtoAtualizado.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produtoAtualizado.imagem_capa_filename}`;
        }
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
    // Método auxiliar para buscar por filename (útil para limpeza)
    buscarPorFilename(filename) {
        return this.Produtos.find(pro => pro.imagem_capa_filename === filename);
    }
}
exports.ProdutoRepository = ProdutoRepository;
