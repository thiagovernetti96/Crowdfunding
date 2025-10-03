import {Categoria} from '../Model/categoria'

export class CategoriaRepository{

  private categorias:Categoria[] =[];
  private idCounter:number = 1
  
  
  inserir(categoria: Omit<Categoria,'id'>):Categoria {
    const newCategoria:Categoria= {
      id:this.idCounter++,
      nome: categoria.nome
    };
    this.categorias.push(newCategoria);
    return newCategoria

  }

  listar():Categoria[]{
    return this.categorias
  }

  buscarporId(id:number):Categoria|undefined{
    return  this.categorias.find(c=>c.id===id)
  }

  buscarporNome(nome:string):Categoria|undefined{
    return this.categorias.find(c=>c.nome===nome)
  }

  atualizar(id:number,Categoria:Omit<Categoria,'id'>):Categoria|undefined{
   const index = this.categorias.findIndex(c=>c.id===id)

    if(index===-1)return undefined;
    const categoriaAtualizada:Categoria={
      id,
      nome:Categoria.nome,
    };
    this.categorias[index]= categoriaAtualizada
    return categoriaAtualizada 

    } 
  

  deletar(id: number): boolean{
    const index = this.categorias.findIndex(categoria=>categoria.id===id);
    if(index!==-1){
      this.categorias.splice(index,1);
      return true;
    }
    return false;
    
  }
  








}