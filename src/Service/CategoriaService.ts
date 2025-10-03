import { Repository } from "typeorm";
import { Categoria } from "../Model/categoria";

export class CategoriaService{

  private categoriaRepository:Repository<Categoria>;
  repository:any
  constructor(categoriaRepository:Repository<Categoria>){
    this.categoriaRepository = categoriaRepository
  }

  async inserir(categoria:Categoria):Promise<Categoria>{
    if(!categoria.nome){
      throw({id:400,msg:"O nome da categoria é obrigatório"})
    }
    else{
      return await this.categoriaRepository.save(categoria);
    }

  }

  async listar():Promise<Categoria[]>{
    return this.categoriaRepository.find()
  }

  async buscarporId(id:number):Promise<Categoria|undefined>{
    let categoria = await this.categoriaRepository.findOne({where:{id}})
    if(!categoria){
      throw{id:400,msg:"Categoria não encontrada"}
    }
    return categoria;
  }

  async buscarporNome(nome:string):Promise<Categoria|undefined>{
    let categoria = await this.categoriaRepository.findOne({where:{nome}})
    if(!categoria){
      throw{id:400,msg:"Categoria não encontrada"}
    }
    return categoria;
  }

  async atualizar(id:number,categoria:Categoria):Promise<Categoria|undefined>{
    let categoriaexistente = await this.categoriaRepository.findOne({where:{id}})
    if(!categoriaexistente){
      throw{id:400,msg:"Categoria não encontrada"}
    }else{
      categoriaexistente.nome = categoria.nome
    }
    return await this.categoriaRepository.save(categoriaexistente);
  }

  async deletar(id: number): Promise<void> {
    let categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria ) {
      throw({id:404,msg:"pessoaJuridica não encontrada"});
    }
    await this.categoriaRepository.remove(categoria);
  }


}