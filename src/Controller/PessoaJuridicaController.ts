import { PessoaJuridicaService } from "../Service/PessoaJuridicaService";
import { Request,Response } from "express";

export class PessoaJuridicaController{
  private pessoaJuridicaService:PessoaJuridicaService;
  constructor(pessoaJuridicaService:PessoaJuridicaService){
    this.pessoaJuridicaService = pessoaJuridicaService;
  }
  async inserir(req:Request,res:Response):Promise<void>{
    try{
      const pessoa_juridica = req.body;
      const newPessoaJuridica = await this.pessoaJuridicaService.inserir(pessoa_juridica);
      res.status(201).json(newPessoaJuridica);
    }catch (error) {
      res.status(400).json({ error: "Erro ao inserir pessoa jurídica" });
    }
  }

  async listar(req:Request,res:Response,):Promise<void>{
    try{
      const lista = await this.pessoaJuridicaService.listar();
      res.status(200).json(lista);
    }catch (error) {
      res.status(400).json({ error: "Erro ao listar pessoas jurídicas" });
    } 
  }
  async buscarporId(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const busca = await this.pessoaJuridicaService.buscarporId(id);
      res.status(200).json(busca);
    }catch (error) {
      res.status(400).json({ error: "Erro ao buscar pessoa jurídica por ID" });
    }
  }

  async buscarporNome(req:Request,res:Response):Promise<void>{
    try{
      const nome = req.params.nome;
      const busca = await this.pessoaJuridicaService.buscarporNome(nome);
      res.status(201).json(busca);
    }catch (error) {
      res.status(400).json({ error: "Erro ao buscar pessoa jurídica por nome" });
    }
  }

  async atualizar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      const {nome, cnpj,razao_social,senha,email} = req.body;
      const pessoaAtualizada = await this.pessoaJuridicaService.atualizar(id,{nome, cnpj,razao_social,senha,email});
      res.status(200).json(pessoaAtualizada);
    }catch (error) {
      res.status(400).json({ error: "Erro ao atualizar pessoa jurídica" });
    } 
  }
  async deletar(req:Request,res:Response):Promise<void>{
    try{
      const id = parseInt(req.params.id);
      await this.pessoaJuridicaService.deletar(id);
      res.status(204).send();
    }catch (error) {
      res.status(400).json({ error: "Erro ao deletar pessoa jurídica" });
    }
  }
}