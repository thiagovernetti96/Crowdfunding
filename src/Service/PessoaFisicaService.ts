import { Repository } from "typeorm";
import { PessoaFisica } from "../Model/pessoa_fisica";

export class PessoaFisicaService{

  private pessoaFisicaRepository: Repository<PessoaFisica>;
  repository:any;
  constructor(pessoaFisicaRepository:Repository<PessoaFisica>){
    this.pessoaFisicaRepository = pessoaFisicaRepository
  }
  
  async inserir(pessoa_fisica:PessoaFisica):Promise<PessoaFisica>{
    if(!pessoa_fisica.cpf||!pessoa_fisica.data_nascimento||!pessoa_fisica.email||!pessoa_fisica.nome||!pessoa_fisica.senha){
      throw({id:400,msg:"Todos os dados são obrigatórios"})
    }
    else{
      return await this.pessoaFisicaRepository.save(pessoa_fisica)
    }         
  }

  async buscarporId(id:number):Promise<PessoaFisica|undefined>{
    let pessoa_fisica=  await this.pessoaFisicaRepository.findOne({where:{id}})
    if(!pessoa_fisica){
      throw{id:404,msg:"Pessoa não encontrada"}
    }else{
      return pessoa_fisica
    }
  }

  async buscarporNome(nome:string):Promise<PessoaFisica|undefined>{
    let pessoa_fisica=  await this.pessoaFisicaRepository.findOne({where:{nome}})
    if(!pessoa_fisica){
      throw{id:404,msg:"Pessoa não encontrada"}
    }else{
      return pessoa_fisica
    }
  }

  async listar():Promise<PessoaFisica[]>{
    return this.pessoaFisicaRepository.find()
  }

  async atualizar(id:number,pessoa_fisica:PessoaFisica):Promise<PessoaFisica|undefined>{
    let pessoa_fisica_existente = await this.pessoaFisicaRepository.findOne({where:{id}})
    if(!pessoa_fisica_existente){
      throw{id:404,msg:"Pessoa não encontrada"}      
    }else{
      pessoa_fisica_existente.cpf = pessoa_fisica.cpf
      pessoa_fisica_existente.data_nascimento = pessoa_fisica.data_nascimento
      pessoa_fisica_existente.email = pessoa_fisica.email
      pessoa_fisica_existente.nome = pessoa_fisica.nome
      pessoa_fisica_existente.senha = pessoa_fisica.senha
    }
    return await this.pessoaFisicaRepository.save(pessoa_fisica_existente)
  }

  async deletar(id:number):Promise<void>{
    let pessoa_fisica = await this.pessoaFisicaRepository.findOne({where:{id}})
    if(!pessoa_fisica){
      throw{id:404,msg:"Pessoa não encontrada"}
    }else{
      await this.pessoaFisicaRepository.remove(pessoa_fisica)
    }
  }
}