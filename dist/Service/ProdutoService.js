"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
class ProdutoService {
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }
    async inserir(produto) {
        if (!produto.nome || !produto.descricao || !produto.categoria || !produto.criador
            || !produto.valor_meta) {
            throw ({ id: 400, msg: "Nome,descrição,categoria,criador e valor meta são obrigatórios" });
        }
        else {
            return await this.produtoRepository.save(produto);
        }
    }
    async getProductsWithTotalArrecadado() {
        const query = `
      SELECT 
        p.*,
        COALESCE(SUM(a.valor), 0) as valorArrecadado,
      FROM product p
      LEFT JOIN apoio a ON a."productId" = p.id
      GROUP BY p.id
    `;
        return await this.produtoRepository.query(query);
    }
    async listar() {
        return this.produtoRepository.find();
    }
    async buscarporId(id) {
        let produto = await this.produtoRepository.findOne({ where: { id } });
        if (!produto) {
            throw ({ id: 404, msg: "Produto não encontrado" });
        }
        return produto;
    }
    async buscarporNome(nome) {
        let produto = await this.produtoRepository.findOne({ where: { nome } });
        if (!produto) {
            throw ({ id: 404, msg: "Produto não encontrado" });
        }
        return produto;
    }
    async atualizar(id, produto) {
        let produtoexistente = await this.produtoRepository.findOne({ where: { id } });
        if (!produtoexistente) {
            throw ({ id: 404, msg: "Produto não encontrado" });
        }
        else {
            produtoexistente.categoria = produto.categoria;
            produtoexistente.criador = produto.criador;
            produtoexistente.descricao = produto.descricao;
            produtoexistente.nome = produto.nome;
            produtoexistente.valor_meta = produto.valor_meta;
        }
        return await this.produtoRepository.save(produtoexistente);
    }
    async deletar(id) {
        let produto = await this.produtoRepository.findOne({ where: { id } });
        if (!produto) {
            throw ({ id: 404, msg: "Produto não encontrado" });
        }
        await this.produtoRepository.remove(produto);
    }
}
exports.ProdutoService = ProdutoService;
