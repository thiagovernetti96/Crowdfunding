import { CategoriaService } from "../Service/CategoriaService";
import {Request,Response} from 'express';

export class CategoriaController{

  private categoriaService : CategoriaService
  constructor(categoriaService:CategoriaService){
    this.categoriaService = categoriaService
  }

  async inserir(req:Request,res:Response):Promise<void>{
    try{
      const categoria = req.body;
      const newCategoria = await this.categoriaService.inserir(categoria)
      res.status(201).json(newCategoria)
    }catch(err:any){
      res.status(err.id).json({message:err.msg})
    }
  }

  async listar(req:Request,res:Response):Promise<void>{
    try{
      const categorias = await this.categoriaService.listar();
      res.status(200).json(categorias)
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg})
    }
  }

 async buscarporId(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    
    // Validação do ID
    if (isNaN(id)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }
    
    const categoria = await this.categoriaService.buscarporId(id);
    
    if (!categoria) {
      res.status(404).json({ message: "Categoria não encontrada" });
      return;
    }
    
    res.status(200).json(categoria);
  } catch (err: any) {
    console.error("Erro em buscarporId:", err);
    res.status(500).json({ 
      message: err.message || "Erro interno ao buscar categoria" 
    });
  }
}

  async buscarporNome(req:Request,res:Response):Promise<void>{
    try{
      const nome = req.params.nome
      const categoria = await this.categoriaService.buscarporNome(nome)
      res.status(200).json(categoria)
    }
    catch(err:any){
      res.status(err.id).json({message:err.id})
    }
  }

  async atualizar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id)
      const {nome} = req.body
      const categoriaAtualizada = await this.categoriaService.atualizar(id,{nome});
      res.status(200).json(categoriaAtualizada);
    }
    catch(err:any){
      const statusCode = err.id || 500;
      const mensagem = err.msg || "Erro ao atualizar categoria.";
      res.status(statusCode).json({ message: mensagem });
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.categoriaService.deletar(id);
      res.status(204).send();
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }


}