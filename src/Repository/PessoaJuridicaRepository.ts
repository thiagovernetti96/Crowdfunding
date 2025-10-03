import { PessoaJuridica } from "../Model/pessoa_juridica";

export class PessoaJuridicaRepository{

  private PessoasJuridicas:PessoaJuridica[]= [];
  private CounterId:number = 1;

  inserir(id:number, pessoa_juridica:Omit<PessoaJuridica,'id'>):PessoaJuridica{
    const newPessoaJuridica = {
      id:this.CounterId++,
      ...pessoa_juridica
    }
    this.PessoasJuridicas.push(newPessoaJuridica)
    return newPessoaJuridica

  }

  listar():PessoaJuridica[]{
    return this.PessoasJuridicas
  }

  buscarporId(id:number):PessoaJuridica|undefined{
    return this.PessoasJuridicas.find(pj=>pj.id===id)
  }

  buscarporNome(nome:string):PessoaJuridica|undefined{
    return  this.PessoasJuridicas.find(pj=>pj.nome===nome)
  }

  atualizar(id:number,pessoa_juridica:Omit<PessoaJuridica,'id'>):PessoaJuridica|undefined{
    const index = this.PessoasJuridicas.findIndex(pj=>pj.id===id);
    if(index ==-1)return undefined;
    const pessoaJuridicaAtualizada:PessoaJuridica={
      id,
      ...pessoa_juridica
    }
    this.PessoasJuridicas[index]= pessoaJuridicaAtualizada;
    return pessoaJuridicaAtualizada
  }

  deletar(id: number): boolean{
    const index = this.PessoasJuridicas.findIndex(pj=>pj.id===id);
    if(index!==-1){
      this.PessoasJuridicas.splice(index,1);
      return true;
    }
    return false;    
  }


}