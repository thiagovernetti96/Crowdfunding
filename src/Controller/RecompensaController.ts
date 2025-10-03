import { RecompensaService } from "../Service/RecompensaService";
import { Request,Response } from "express";

export class RecompensaController{
  private recompensaService:RecompensaService;
  constructor(recompensaService:RecompensaService){
    this.recompensaService = recompensaService;
  }

  async inserir(req:Request,res:Response):Promise<void>{
    try{
      console.log("Dados recebidos:", req.body);
      const recompensa = req.body;
      const newRecompensa = await this.recompensaService.inserir(recompensa);
      res.status(201).json(newRecompensa);
    }catch (err: any) {
    console.error("ERROR:", err);
    const statusCode = err.id || 500;
    res.status(statusCode).json({ 
      message: err.msg || err.message || "Erro" 
    });
  }
  }
  async listar(req:Request,res:Response):Promise<void>{   
    try{
      const lista = await this.recompensaService.listar();
      res.status(200).json(lista);
    } 
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async buscarporId(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const busca = await this.recompensaService.buscarporId(id);
      res.status(201).json(busca);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async buscarporNome(req:Request,res:Response):Promise<void>{
    try{
      const nome = req.params.nome;
      const busca = await this.recompensaService.buscarporNome(nome);
      res.status(201).json(busca);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async atualizar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const recompensa = req.body;
      const recompensaAtualizada = await this.recompensaService.atualizar(id,recompensa);
      res.status(200).json(recompensaAtualizada);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async deletar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      await this.recompensaService.deletar(id);
      res.status(204).send();
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }
}