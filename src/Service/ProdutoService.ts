import { Repository } from "typeorm";
import { Produto } from "../Model/produto";

export class ProdutoService{

  private produtoRepository:Repository<Produto>;
  repository:any
  constructor(produtoRepository:Repository<Produto>){
    this.produtoRepository = produtoRepository
  }
  async inserir(produto:Produto):Promise<Produto>{
    if(!produto.nome||!produto.descricao||!produto.categoria||!produto.criador
      ||!produto.valor_meta){
      throw({id:400,msg:"Nome,descrição,categoria,criador e valor meta são obrigatórios"});      
    }else{
      return await this.produtoRepository.save(produto);
    }
    

  }

  async getProductsWithTotalArrecadado(): Promise<any[]> {
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
    
  async listar():Promise<Produto[]>{
    return this.produtoRepository.find()
  }

  async buscarporId(id:number):Promise<Produto|undefined>{
    let produto = await this.produtoRepository.findOne({where:{id}});
    if (!produto){
      throw({id:404,msg:"Produto não encontrado"})
    }
    return produto;
  }

  async buscarporNome(nome:string):Promise<Produto|undefined>{
    let produto = await this.produtoRepository.findOne({where:{nome}});
    if (!produto){
      throw({id:404,msg:"Produto não encontrado"})
    }
    return produto;
  }

  async atualizar(id:number,produto:Produto):Promise<Produto|undefined>{
    let produtoexistente = await this.produtoRepository.findOne({where:{id}});
    if (!produtoexistente){
      throw({id:404,msg:"Produto não encontrado"})
    }
    else{
      produtoexistente.categoria = produto.categoria;
      produtoexistente.criador = produto.criador
      produtoexistente.descricao = produto.descricao;
      produtoexistente.nome = produto.nome;
      produtoexistente.valor_meta = produto.valor_meta;
    }
    return await this.produtoRepository.save(produtoexistente);
  }

  async deletar(id: number): Promise<void> {
    let produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) {
      throw({id:404,msg:"Produto não encontrado"});
    }
    await this.produtoRepository.remove(produto);
  } 

}