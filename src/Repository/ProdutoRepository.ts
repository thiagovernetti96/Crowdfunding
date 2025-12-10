import { Produto } from '../Model/produto'

export class ProdutoRepository {
  private Produtos: Produto[] = [];
  private CounterId: number = 1;

  adicionar(produto: Omit<Produto, 'id'>, imagemFilename?: string): Produto {
    const newProduto: Produto = {
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
    }

    // Se temos filename, gera a URL completa
    if (imagemFilename) {
      newProduto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${imagemFilename}`;
    }

    this.Produtos.push(newProduto);
    return newProduto;
  }

  listar(): Produto[] {
    // Processa cada produto para garantir que as imagens tenham URL correta
    return this.Produtos.map(produto => {
      if (produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
        produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
      }
      return produto;
    });
  }

  buscarporId(id: number): Produto | undefined {
    const produto = this.Produtos.find(pro => pro.id === id);
    if (produto && produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
      produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
    }
    return produto;
  }

  buscarporCriador(nomeCriador: string): Produto[] {
    const produtos = this.Produtos.filter(pro => pro.criador === nomeCriador);
    return produtos.map(produto => {
      if (produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
        produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
      }
      return produto;
    });
  }

  buscarporCategoria(nomecategoria:string):Produto[]{
    const produtos = this.Produtos.filter(pro=>pro.categoria===nomecategoria);
     return produtos.map(produto => {
      if (produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
        produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
      }
      return produto;
    });
  }

  buscarporNome(nome: string): Produto | undefined {
    const produto = this.Produtos.find(pro => pro.nome === nome);
    if (produto && produto.imagem_capa_filename && !produto.imagem_capa?.includes('/uploads/')) {
      produto.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produto.imagem_capa_filename}`;
    }
    return produto;
  }

  atualizar(id: number, produto: Omit<Produto, 'id'>, imagemFilename?: string): Produto | undefined {
    const index = this.Produtos.findIndex(pro => pro.id === id);
    if (index == -1) return undefined;

    const produtoAtualizado: Produto = {
      id,
      ...produto,
      imagem_capa_filename: imagemFilename || this.Produtos[index].imagem_capa_filename
    };

    // Atualiza a URL da imagem se temos filename
    if (imagemFilename) {
      produtoAtualizado.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${imagemFilename}`;
    } else if (produtoAtualizado.imagem_capa_filename && !produtoAtualizado.imagem_capa?.includes('/uploads/')) {
      produtoAtualizado.imagem_capa = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${produtoAtualizado.imagem_capa_filename}`;
    }

    this.Produtos[index] = produtoAtualizado;
    return produtoAtualizado;
  }

  deletar(id: number): boolean {
    const index = this.Produtos.findIndex(pro => pro.id === id);
    if (index !== -1) {
      this.Produtos.splice(index, 1);
      return true;
    }
    return false;
  }

  // Método auxiliar para buscar por filename (útil para limpeza)
  buscarPorFilename(filename: string): Produto | undefined {
    return this.Produtos.find(pro => pro.imagem_capa_filename === filename);
  }
}