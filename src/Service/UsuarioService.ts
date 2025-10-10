import { Repository } from "typeorm";
import {Usuario } from "../Model/usuario";

export class UsuarioService{

  private usuarioRepository: Repository<Usuario>;
  repository:any;
  constructor(usuarioRepository:Repository<Usuario>){
    this.usuarioRepository = usuarioRepository
  }
  
  async inserir(usuario:Usuario):Promise<Usuario>{
    if(!usuario.email||!usuario.nome||!usuario.senha){
      throw({id:400,msg:"Todos os dados são obrigatórios"})
    }
    else{
      return await this.usuarioRepository.save(usuario)
    }         
  }

  async buscarporId(id:number):Promise<Usuario|undefined>{
    let usuario=  await this.usuarioRepository.findOne({where:{id}})
    if(!usuario){
      throw{id:404,msg:"Usuário não encontrado"}
    }else{
      return usuario
    }
  }

  async buscarporNome(nome:string):Promise<Usuario|undefined>{
    let pessoa_fisica=  await this.usuarioRepository.findOne({where:{nome}})
    if(!pessoa_fisica){
      throw{id:404,msg:"Usuário não encontrado"}
    }else{
      return pessoa_fisica
    }
  }

  async listar():Promise<Usuario[]>{
    return this.usuarioRepository.find()
  }

  async atualizar(id:number,usuario:Usuario):Promise<Usuario|undefined>{
    let usuario_existente = await this.usuarioRepository.findOne({where:{id}})
    if(!usuario_existente){
      throw{id:404,msg:"Pessoa não encontrada"}      
    }else{
      usuario_existente.email = usuario.email
      usuario_existente.nome = usuario.nome
      usuario_existente.senha = usuario.senha
    }
    return await this.usuarioRepository.save(usuario_existente)
  }

  async deletar(id:number):Promise<void>{
    let usuario= await this.usuarioRepository.findOne({where:{id}})
    if(!usuario){
      throw{id:404,msg:"Usuario não encontrado"}
    }else{
      await this.usuarioRepository.remove(usuario)
    }
  }
}