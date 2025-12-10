import { ProdutoService } from "../Service/ProdutoService";
import { Request, Response } from "express";
import upload from "../Config/multer";

export class ProdutoController { 
  private produtoService: ProdutoService;
  public uploadImage = upload.single('imagem_capa');

  constructor(produtoService: ProdutoService) {
    this.produtoService = produtoService;
  }

  async inserir(req: Request, res: Response): Promise<void> {
    try {
      console.log("REQUEST BODY:", req.body);
      console.log("FILE:", req.file);

      const { nome, descricao, valor_meta, categoriaId, criadorId } = req.body;
      let imagemFilename: string | undefined = undefined;

      if (req.file) {
        imagemFilename = req.file.filename;
      }

      const produtoData: any = {
        nome,
        descricao,
        valor_meta: parseFloat(valor_meta),
        categoria: { id: parseInt(categoriaId) },
        criador: { id: parseInt(criadorId) }
      };

      const newProduto = await this.produtoService.inserir(produtoData, imagemFilename);
      res.status(201).json(newProduto);
      
    } catch (err: any) {
      console.error("ERROR:", err);
      const statusCode = err.id || 500;
      res.status(statusCode).json({ 
        message: err.msg || err.message || "Erro",
        detalhes: err.detalhes || null
      });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { nome, descricao, valor_meta, categoriaId } = req.body;
      let imagemFilename: string | undefined = undefined;

      if (req.file) {
        imagemFilename = req.file.filename;
      }
      const produtoData: any = {
        nome,
        descricao,
        valor_meta: parseFloat(valor_meta),
        categoria: { id: parseInt(categoriaId) }
      };

      const produtoAtualizado = await this.produtoService.atualizar(id, produtoData, imagemFilename);
      res.status(200).json(produtoAtualizado);
      
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const lista = await this.produtoService.listar();
      res.status(200).json(lista);
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

  async buscarporId(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const busca = await this.produtoService.buscarporId(id);
      res.status(200).json(busca);
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

  async buscarporNome(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.params.nome;
      const busca = await this.produtoService.buscarporNome(nome);
      res.status(200).json(busca);
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

  async buscarPorCriador(req: Request, res: Response): Promise<void> {
    try {
      const nomeCriador = req.params.nomeCriador;
      const busca = await this.produtoService.buscarPorCriador(nomeCriador);
      res.status(200).json(busca);
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

async buscarPorCategoria(req: Request, res: Response): Promise<void> {
  try {
    const nomeCategoria = req.params.nomeCategoria;
    
    // Validação básica
    if (!nomeCategoria || nomeCategoria.trim() === '') {
      res.status(400).json({ message: "Nome da categoria é obrigatório" });
      return;
    }
    
    const busca = await this.produtoService.buscarporCategoria(nomeCategoria);
    res.status(200).json(busca);
  } catch (err: any) {
    console.error("Erro em buscarPorCategoria:", err);
    res.status(500).json({ 
      message: err.message || "Erro interno ao buscar por categoria" 
    });
  }
}

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.produtoService.deletar(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

   async listarComArrecadacao(req: Request, res: Response) {
    try {
      const produtos = await this.produtoService.getProductsWithTotalArrecadado();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }

  async obterPorIdComArrecadacao(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await this.produtoService.getProductWithTotalArrecadadoById(Number(id));
      
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  }

  async buscarPorCriadorComArrecadacao(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const produtos = await this.produtoService.getProductsByCreatorWithTotalArrecadado(nome);
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos do criador' });
    }
  }
}