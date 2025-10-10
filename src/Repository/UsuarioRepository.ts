
import { Usuario } from "../Model/usuario";

export class UsuarioRepository{

private usuarios:Usuario[] = [];
private idCounter:number = 1


  inserir(usuario:Omit<Usuario,'id'>):Usuario{
    const newUsuario:Usuario = {
      id:this.idCounter++,
      ...usuario
    }
    this.usuarios.push(newUsuario);
    return newUsuario
  }

  listar():Usuario[]{
    return this.usuarios;
  }

  buscarporId(id:number):Usuario|undefined{
    return this.usuarios.find(u=>u.id===id)
  }

  buscarporNome(nome:string):Usuario|undefined{
    return this.usuarios.find(u=>u.nome===nome)
  }

  atualizar(id:number,usuario:Omit<Usuario,'id'>):Usuario|undefined{
    const index = this.usuarios.findIndex(u=>u.id===id)
    if(index ===-1) return undefined
    const usuarioAtualizado:Usuario ={
      id,
      ...usuario
    }
    this.usuarios[index] =  usuarioAtualizado
    return usuarioAtualizado
  }

  deletar(id: number): boolean{
      const index = this.usuarios.findIndex(pf=>pf.id===id);
      if(index!==-1){
        this.usuarios.splice(index,1);
        return true;
      }
      return false;    
    }

}