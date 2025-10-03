import { Repository } from "typeorm";
import { PessoaJuridica } from "../Model/pessoa_juridica";

export class PessoaJuridicaService{

  private pessoaJuridicaRepository: Repository<PessoaJuridica>;
  repository:any;
  constructor(pessoaJuridicaRepository:Repository<PessoaJuridica>){
    this.pessoaJuridicaRepository = pessoaJuridicaRepository
  }

  async inserir(pessoa_juridica:PessoaJuridica):Promise<PessoaJuridica>{
    if(!pessoa_juridica.cnpj||!pessoa_juridica.email||!pessoa_juridica.razao_social
      ||!pessoa_juridica.email||!pessoa_juridica.senha||!pessoa_juridica.nome){
      throw ({id:400,msg:"Todos os dados são obrigatórios"});
    }else{
      return await this.pessoaJuridicaRepository.save(pessoa_juridica)
    }
  }

  async listar():Promise<PessoaJuridica[]>{
    return this.pessoaJuridicaRepository.find()
  }

  async buscarporId(id:number):Promise<PessoaJuridica|undefined>{
    let pessoa_juridica = await this.pessoaJuridicaRepository.findOne({where:{id}});
    if(!pessoa_juridica){
      throw({id:404,msg:"Pessoa jurídica não encontrada"})
    }
    return pessoa_juridica;
  }

  async buscarporNome(nome:string):Promise<PessoaJuridica|undefined>{
    let pessoa_juridica = await this.pessoaJuridicaRepository.findOne({where:{nome}});
    if(!pessoa_juridica){
      throw({id:404,msg:"Pessoa Jurídica não encontrada"})
    }
  return pessoa_juridica;
  }

  async atualizar(id:number,pessoa_juridica:PessoaJuridica):Promise<PessoaJuridica|undefined>{
    let pessoa_juridica_existente = await this.pessoaJuridicaRepository.findOne({where:{id}})
    if(!pessoa_juridica_existente){
      throw ({ id: 404, msg: "Pessoa jurídica não encontrada" });
    } else{
      pessoa_juridica_existente.cnpj = pessoa_juridica.cnpj;
      pessoa_juridica_existente.email = pessoa_juridica.email;
      pessoa_juridica_existente.nome = pessoa_juridica.nome;
      pessoa_juridica_existente.senha = pessoa_juridica.senha;
      pessoa_juridica_existente.razao_social = pessoa_juridica.razao_social
    }
    return await this.pessoaJuridicaRepository.save(pessoa_juridica_existente)
    
  }

  async deletar(id: number): Promise<void> {
    let pessoa_juridica = await this.pessoaJuridicaRepository.findOne({ where: { id } });
    if (!pessoa_juridica ) {
      throw({id:404,msg:"Pessoa jurídica não encontrada"});
    }
    await this.pessoaJuridicaRepository.remove(pessoa_juridica);
  }









}