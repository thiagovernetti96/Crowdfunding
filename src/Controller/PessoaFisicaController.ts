import { PessoaFisicaService } from "../Service/PessoaFisicaService";
import { Request,Response } from "express";

export class PessoaFisicaController{

  private pessoaFisicaService:PessoaFisicaService;
  constructor(pesssoaFisicaService:PessoaFisicaService){
    this.pessoaFisicaService = pesssoaFisicaService;
  }

  async inserir(req:Request,res:Response):Promise<void>{
    console.log(req.body);
    try{
      const pessoa_fisica = req.body;
      const newPessoaFisica = await this.pessoaFisicaService.inserir(pessoa_fisica);
      res.status(201).json(newPessoaFisica);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }

  }

  async listar(req:Request,res:Response):Promise<void>{

    try{
      const lista = await this.pessoaFisicaService.listar();
      res.status(200).json(lista);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }

  }

  async buscarporId(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const busca = await this.pessoaFisicaService.buscarporId(id);
      res.status(200).json(busca);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async buscarporNome(req:Request,res:Response):Promise<void>{
    try{
      const nome = req.params.nome;
      const busca = await this.pessoaFisicaService.buscarporNome(nome);
      res.status(201).json(busca);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async atualizar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const pessoa_fisica = req.body;
      const pessoa_fisica_atualizada = await this.pessoaFisicaService.atualizar(id,pessoa_fisica);
      res.status(200).json(pessoa_fisica_atualizada);
    }
    catch(err:any){
      res.status(err.id).json({message:err.msg});
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.pessoaFisicaService.deletar(id);
      res.status(204).send();
    } catch(err:any){
      res.status(err.id).json({message: err.msg});
    }
  }








}