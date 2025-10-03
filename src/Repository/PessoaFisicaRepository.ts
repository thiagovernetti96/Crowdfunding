import { PessoaFisica } from "../Model/pessoa_fisica";
import { Usuario } from "../Model/usuario";

export class PessoaFisicaRepository{

private pessoasFisicas:Usuario[] = [];
private idCounter:number = 1


  inserir(pessoafisica:Omit<PessoaFisica,'id'>):PessoaFisica{
    const newPessoaFisica:PessoaFisica = {
      id:this.idCounter++,
      ...pessoafisica
    }
    this.pessoasFisicas.push(newPessoaFisica);
    return newPessoaFisica
  }

  listar():PessoaFisica[]{
    return this.pessoasFisicas;
  }

  buscarporId(id:number):PessoaFisica|undefined{
    return this.pessoasFisicas.find(pf=>pf.id===id)
  }

  buscarporNome(nome:string):PessoaFisica|undefined{
    return this.pessoasFisicas.find(pf=>pf.nome===nome)
  }

  atualizar(id:number,pessoafisica:Omit<PessoaFisica,'id'>):PessoaFisica|undefined{
    const index = this.pessoasFisicas.findIndex(pf=>pf.id===id)
    if(index ===-1) return undefined
    const pessoaFisicaAtualizada:PessoaFisica ={
      id,
      ...PessoaFisica
    }
    this.pessoasFisicas[index] =  pessoaFisicaAtualizada
    return pessoaFisicaAtualizada
  }

  deletar(id: number): boolean{
      const index = this.pessoasFisicas.findIndex(pf=>pf.id===id);
      if(index!==-1){
        this.pessoasFisicas.splice(index,1);
        return true;
      }
      return false;    
    }







}