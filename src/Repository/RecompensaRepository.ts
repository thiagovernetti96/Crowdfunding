import { Recompensa } from "../Model/recompensa";

export class RecompensaRepository{
  private Recompensas:Recompensa[] = []
  private CounterId:number = 1;

  inserir(id:number,recompensa:Omit<Recompensa,'id'>):Recompensa{
    const newRecompensa = {
      id:this.CounterId++,
      nome: recompensa.nome,
      descricao: recompensa.descricao,
      valor_minimo: recompensa.valor_minimo,
      quantidade_maxima: recompensa.quantidade_maxima,
      quantidade_disponivel: recompensa.quantidade_disponivel,
      produto: recompensa.produto
    }
    this.Recompensas.push(newRecompensa)
    return newRecompensa

  }

  listar():Recompensa[]{
    return this.Recompensas
  }

  buscarporId(id:number):Recompensa|undefined{
    return this.Recompensas.find(re=>re.id===id)
  }

  
  buscarporNome(nome:string):Recompensa|undefined{
    return this.Recompensas.find(Recompensa=>Recompensa.nome === nome)
  }

  atualizar(id:number,recompensa:Omit<Recompensa,'id'>):Recompensa|undefined{
      const index = this.Recompensas.findIndex(re=>re.id===id);
      if(index ==-1)return undefined;
      const recompensaAtualizada:Recompensa={
        id,
        ...recompensa
      }
      this.Recompensas[index]= recompensaAtualizada;
      return recompensaAtualizada
    }
  
    deletar(id: number): boolean{
      const index = this.Recompensas.findIndex(re=>re.id===id);
      if(index!==-1){
        this.Recompensas.splice(index,1);
        return true;
      }
      return false;    
    }


}

  
