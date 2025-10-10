import {Produto} from '../Model/produto'

export class ProdutoRepository{

  private Produtos :Produto[]= [];
  private CounterId:number = 1;

  adicionar(produto:Omit<Produto,'id'>):Produto{
    const newProduto = {
      id:this.CounterId++,
      nome:produto.nome,
      descricao:produto.descricao,
      valor_meta:produto.valor_meta,
      criador:produto.criador,
      categoria:produto.categoria,
      imagem_capa:produto.imagem_capa||'',
      valor_arrecadad0o:produto.valor_arrecadado||0
    }
    this.Produtos.push(newProduto)
    return newProduto

  }

  listar(): Produto[]{
    return this.Produtos
  }

  buscarporId(id:number):Produto|undefined{
    return this.Produtos.find(pro=>pro.id===id)
  }

  buscarporNome(nome:string):Produto|undefined{
    return this.Produtos.find(pro=>pro.nome === nome)
  }

  atualizar(id:number,produto:Omit<Produto,'id'>):Produto|undefined{
    const index = this.Produtos.findIndex(pro=>pro.id===id);
    if(index ==-1)return undefined;
    const produtoAtualizado:Produto={
      id,
      ...produto
    }
    this.Produtos[index]= produtoAtualizado;
    return produtoAtualizado
  }

  deletar(id: number): boolean{
    const index = this.Produtos.findIndex(pro=>pro.id===id);
    if(index!==-1){
      this.Produtos.splice(index,1);
      return true;
    }
    return false;    
  }

}