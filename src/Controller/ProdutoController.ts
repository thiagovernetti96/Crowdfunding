import { ProdutoService } from "../Service/ProdutoService";
import { Request,Response } from "express";

export class ProdutoController{ 
  private produtoService:ProdutoService;
  constructor(produtoService:ProdutoService){
    this.produtoService = produtoService;
  }

async inserir(req: Request, res: Response): Promise<void> {
  try {
    console.log("REQUEST BODY:", req.body);
    const produto = req.body;
    const newProduto = await this.produtoService.inserir(produto);
    res.status(201).json(newProduto);
  } catch (err: any) {
    console.error("ERROR:", err);
    const statusCode = err.id || 500;
    res.status(statusCode).json({ 
      message: err.msg || err.message || "Erro" 
    });
  }
}

  async listar(req:Request,res:Response):Promise<void>{
    try{
      const lista = await this.produtoService.listar();
      res.status(200).json(lista);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async buscarporId(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const busca = await this.produtoService.buscarporId(id);
      res.status(201).json(busca);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async buscarporNome(req:Request,res:Response):Promise<void>{
    try{
      const nome = req.params.nome;
      const busca = await this.produtoService.buscarporNome(nome);
      res.status(201).json(busca);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async atualizar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const produto = req.body;
      const produtoAtualizado = await this.produtoService.atualizar(id,produto);
      res.status(200).json(produtoAtualizado);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }
  async deletar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      await this.produtoService.deletar(id);
      res.status(204).send();
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }
}
