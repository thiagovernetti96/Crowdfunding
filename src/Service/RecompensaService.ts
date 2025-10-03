import { Repository } from "typeorm";
import { Recompensa } from "../Model/recompensa";

export class RecompensaService{
  private recompensaRepository:Repository<Recompensa>;
  repository:any
  constructor(recompensaRepository:Repository<Recompensa>){
    this.recompensaRepository = recompensaRepository
  }

  async inserir(recompensa:Recompensa):Promise<Recompensa>{
    if(!recompensa.nome||!recompensa.descricao||!recompensa.produto||!recompensa.valor_minimo||!recompensa.quantidade_maxima||!recompensa.quantidade_disponivel){
      throw({id:400,msg:"Nome,descrição,produto,valor mínimo,quantidade máxima e quantidade disponível são obrigatórios"});
    }else{
      return await this.recompensaRepository.save(recompensa);
    }
  }

  async listar():Promise<Recompensa[]>{
    return this.recompensaRepository.find()
  }

  async buscarporId(id:number):Promise<Recompensa|undefined>{
    let recompensa = await this.recompensaRepository.findOne({where:{id}})
    if(!recompensa){
      throw{id:404,msg:"Recompensa não encontrada"}
    }
    return recompensa;
  }

  async buscarporNome(nome:string):Promise<Recompensa|undefined>{
    let recompensa = await this.recompensaRepository.findOne({where:{nome}})
    if(!recompensa){
      throw{id:404,msg:"Recompensa não encontrada"}
    }
    return recompensa;
  }

  async atualizar(id:number,recompensa:Recompensa):Promise<Recompensa|undefined>{
    let recompensaexistente = await this.recompensaRepository.findOne({where:{id}})
    if(!recompensaexistente){
      throw{id:404,msg:"Recompensa não encontrada"}
    }else{
      recompensaexistente.nome = recompensa.nome
      recompensaexistente.descricao = recompensa.descricao
      recompensaexistente.produto = recompensa.produto
      recompensaexistente.valor_minimo = recompensa.valor_minimo
      recompensaexistente.quantidade_maxima = recompensa.quantidade_maxima
    }
    return await this.recompensaRepository.save(recompensaexistente);
  }

  async deletar(id: number): Promise<void> {
    let recompensa = await this.recompensaRepository.findOne({ where: { id } });
    if (!recompensa ) {
      throw({id:404,msg:"Recompensa não encontrada"});
    }
    await this.recompensaRepository.remove(recompensa);
  }
  

}