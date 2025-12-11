import { ILike, Repository } from "typeorm";
import { Produto } from "../Model/produto";
import { ProdutoRepository } from "../Repository/ProdutoRepository";

export class ProdutoService {
  private produtoRepository: Repository<Produto>;
  private produtoCustomRepository: ProdutoRepository;

  constructor(produtoRepository: Repository<Produto>) {
    this.produtoRepository = produtoRepository;
    this.produtoCustomRepository = new ProdutoRepository();
  }

  async inserir(produto: Produto, imagemFilename?: string): Promise<Produto> {
    try {
      // Validações
      if (!produto.nome || !produto.descricao || !produto.categoria || !produto.criador || !produto.valor_meta) {
        throw { 
          id: 400, 
          msg: "Nome, descrição, categoria, criador e valor meta são obrigatórios" 
        };
      }

      // Se foi enviado um arquivo, atualiza o filename
      if (imagemFilename) {
        produto.imagem_capa_filename = imagemFilename;
        produto.imagem_capa = undefined; // Limpa o campo antigo se existir
      }

      // Usa o TypeORM Repository para salvar no banco
      const novoProduto = await this.produtoRepository.save(produto);
      return novoProduto;

    } catch (error: any) {
      console.error("Erro ao inserir produto:", error);
      throw { 
        id: 500, 
        msg: "Erro interno ao salvar produto", 
        detalhes: error.message || error 
      };
    }
  }

  async atualizar(id: number, produto: Produto, imagemFilename?: string): Promise<Produto> {
    try {
      // Busca produto existente
      const produtoExistente = await this.produtoRepository.findOne({ where: { id } });
      
      if (!produtoExistente) {
        throw { id: 404, msg: "Produto não encontrado" };
      }

      // Atualiza campos
      produtoExistente.nome = produto.nome;
      produtoExistente.descricao = produto.descricao;
      produtoExistente.valor_meta = produto.valor_meta;
      produtoExistente.categoria = produto.categoria;
      produtoExistente.criador = produto.criador;

      // Se foi enviada uma nova imagem, atualiza
      if (imagemFilename) {
        produtoExistente.imagem_capa_filename = imagemFilename;
        produtoExistente.imagem_capa = undefined; // Limpa campo antigo
      }

      // Salva no banco usando TypeORM
      const produtoAtualizado = await this.produtoRepository.save(produtoExistente);
      return produtoAtualizado;

    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      throw { 
        id: 500, 
        msg: "Erro interno ao atualizar produto", 
        detalhes: error.message || error 
      };
    }
  }

  async listar(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ["categoria", "criador"]
    });
  }

  async buscarporId(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ 
      where: { id },
      relations: ["categoria", "criador"]
    });
    
    if (!produto) {
      throw { id: 404, msg: "Produto não encontrado" };
    }
    
    return produto;
  }

  async buscarPorCriador(nomeCriador: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { criador: { nome: nomeCriador } },
      relations: ["criador", "categoria"]
    });
  }

  async buscarporNome(nome: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ 
      where: { nome },
      relations: ["categoria", "criador"]
    });
    
    if (!produto) {
      throw { id: 404, msg: "Produto não encontrado" };
    }
    
    return produto;
  }

  async buscarporCategoria(nomeCategoria: string): Promise<Produto[]> {
  try {
    if (!nomeCategoria) {
      return [];
    }
    
    // Usando QueryBuilder com subquery para arrecadação
    const queryBuilder = this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.categoria', 'categoria')
      .leftJoinAndSelect('produto.criador', 'criador')
      .where('categoria.nome ILIKE :categoria', { categoria: `%${nomeCategoria}%` });
    
    // Adiciona subquery para calcular arrecadação
    queryBuilder
      .addSelect((subQuery) => {
        return subQuery
          .select('COALESCE(SUM(apoio.valor), 0)', 'valor_arrecadado')
          .from('apoio', 'apoio')
          .where('apoio."produtoId" = produto.id')
          .andWhere('apoio.status = :status', { status: 'PAID' });
      }, 'valor_arrecadado');
    
    const resultados = await queryBuilder.getRawAndEntities();
    
    console.log(`Resultados raw:`, resultados.raw);
    console.log(`Resultados entities:`, resultados.entities);
    
    // Combina as entidades com os dados raw
    const produtosComArrecadacao = resultados.entities.map((produto, index) => {
      const raw = resultados.raw[index];
      
      const produtoInstancia = new Produto();
      
      // Copia propriedades básicas
      produtoInstancia.id = produto.id;
      produtoInstancia.nome = produto.nome;
      produtoInstancia.descricao = produto.descricao;
      produtoInstancia.valor_meta = produto.valor_meta;
      produtoInstancia.imagem_capa = produto.imagem_capa;
      produtoInstancia.imagem_capa_filename = produto.imagem_capa_filename;
      produtoInstancia.categoria = produto.categoria;
      produtoInstancia.criador = produto.criador;
       
    if (produtoInstancia.imagem_capa_filename && !produtoInstancia.imagem_capa?.includes('/uploads/')) {
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
      produtoInstancia.imagem_capa = `${baseUrl}/uploads/${produtoInstancia.imagem_capa_filename}`;
    }
      // Adiciona arrecadação do raw
      produtoInstancia.valor_arrecadado = raw ? parseFloat(raw.valor_arrecadado || '0') : 0;
      
      return produtoInstancia;
    });
    
    return produtosComArrecadacao;
    
  } catch (error) {
    console.error("Erro em buscarporCategoria service:", error);
    throw error;
  }
}


  async deletar(id: number): Promise<void> {
    const produto = await this.produtoRepository.findOne({ where: { id } });
    
    if (!produto) {
      throw { id: 404, msg: "Produto não encontrado" };
    }
    
    await this.produtoRepository.remove(produto);
  }

async listarComArrecadacao(): Promise<Produto[]> {
  const produtos = await this.produtoRepository.find({
    relations: ["categoria", "criador"]
  });

  const produtosComArrecadacao = await Promise.all(
    produtos.map(async (produto) => {
      const resultado = await this.produtoRepository
        .createQueryBuilder('produto')
        .leftJoin('apoio', 'apoio', 'apoio."produtoId" = produto.id AND apoio.status = :status', { 
          status: 'PAID' 
        })
        .select('COALESCE(SUM(apoio.valor), 0)', 'total')
        .where('produto.id = :id', { id: produto.id })
        .getRawOne();
      
      const valorArrecadado = parseFloat(resultado?.total || '0');
    
      const produtoInstancia = new Produto();
      Object.assign(produtoInstancia, produto);
      
      // Força o updateImagePath se não foi chamado
      if (produtoInstancia.imagem_capa_filename && 
          !produtoInstancia.imagem_capa?.includes('/uploads/')) {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        produtoInstancia.imagem_capa = `${baseUrl}/uploads/${produtoInstancia.imagem_capa_filename}`;
      }
      
      produtoInstancia.valor_arrecadado = valorArrecadado;
      
      return produtoInstancia;
    })
  );
  
  return produtosComArrecadacao;
}

async getProductWithTotalArrecadadoById(id: number): Promise<any> {
  const query = `
    SELECT 
      p.*,
      COALESCE(SUM(a.valor), 0) as valor_arrecadado,
      u.nome as criador_nome,
      c.nome as categoria_nome
    FROM produto p
    LEFT JOIN apoio a ON a."produtoId" = p.id AND a.status = 'PAID'
    LEFT JOIN usuario u ON p."criadorId" = u.id
    LEFT JOIN categoria c ON p."categoriaId" = c.id
    WHERE p.id = $1
    GROUP BY p.id, u.nome, c.nome
  `;  
  const result = await this.produtoRepository.query(query, [id]);
  return result[0] || null;
}

async getProductsByCreatorWithTotalArrecadado(criadorNome: string): Promise<any[]> {
  const query = `
    SELECT 
      p.*,
      COALESCE(SUM(a.valor), 0) as valor_arrecadado,
      u.nome as criador_nome
    FROM produto p
    LEFT JOIN apoio a ON a."produtoId" = p.id AND a.status = 'PAID'
    INNER JOIN usuario u ON p."criadorId" = u.id
    WHERE u.nome = $1
    GROUP BY p.id, u.nome
    ORDER BY p.id
  `;  
  return await this.produtoRepository.query(query, [criadorNome]);
}
}