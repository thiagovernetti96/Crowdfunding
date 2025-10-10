import express,{Request,Response} from "express";
import { Usuario } from "./Model/usuario";
import {Categoria} from "./Model/categoria";
import { CategoriaRepository } from "./Repository/CategoriaRepository";
import { CategoriaService } from "./Service/CategoriaService";
import { CategoriaController } from "./Controller/CategoriaController";
import {CategoriaRouter} from "./Routes/CategoriaRouter"
import { UsuarioRepository } from "./Repository/UsuarioRepository";
import { UsuarioService } from "./Service/UsuarioService";
import { UsuarioController } from "./Controller/UsuarioController";
import { UsuarioRouter } from "./Routes/UsuarioRouter";
import { Produto } from "./Model/produto";
import { ProdutoRepository } from "./Repository/ProdutoRepository";
import { ProdutoService } from "./Service/ProdutoService";
import { ProdutoController } from "./Controller/ProdutoController";
import { ProdutoRouter } from "./Routes/ProdutoRouter";
import { Recompensa } from "./Model/recompensa";
import { RecompensaRepository } from "./Repository/RecompensaRepository";
import { RecompensaService } from "./Service/RecompensaService";
import { RecompensaController } from "./Controller/RecompensaController";
import { RecompensaRouter } from "./Routes/RecompensaRouter";
import { Apoio } from "./Model/apoio";
import { ApoioRepository } from "./Repository/ApoioRepository";
import { ApoioService } from "./Service/ApoioService";
import { ApoioController } from "./Controller/ApoioController";
import { ApoioRouter } from "./Routes/ApoioRouter";
import { LoginService } from "./Service/LoginService";
import {LoginController} from "./Controller/LoginController";
import {TokenMiddleware} from "./Middleware/TokenMiddleware";
import "reflect-metadata";
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());
    const cors = require('cors');
    app.use(cors({
      origin:'*',
    }))
    const port = 3000;
    app.use(express.json());
    //Inicializar Dependencias
    // Categoria
    const CategoriaRepository = AppDataSource.getRepository(Categoria);
    const categoriaService = new CategoriaService(CategoriaRepository);
    const categoriaController = new CategoriaController(categoriaService);
    //Pessoa Fisica
    const UsuarioRepository = AppDataSource.getRepository(Usuario);
    const usuarioService = new UsuarioService(UsuarioRepository);
    const usuarioController = new UsuarioController(usuarioService);
    //Pessoa Juridica

    //Produto
    const ProdutoRepository = AppDataSource.getRepository(Produto);
    const produtoService = new ProdutoService(ProdutoRepository);
    const produtoController = new ProdutoController(produtoService);
    //Recompensa
    const RecompensaRepository = AppDataSource.getRepository(Recompensa);
    const recompensaService = new RecompensaService(RecompensaRepository);
    const recompensaController = new RecompensaController(recompensaService);
    //Apoio
    const apoioRepository = AppDataSource.getRepository(Apoio);
    const apoioService = new ApoioService();
    const apoioController = new ApoioController();
    //Login 
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const loginService = new LoginService(usuarioRepository);
    const loginController = new LoginController(loginService);
    //Midleware TokenMiddleware
    const tokenMiddleware = new TokenMiddleware(loginService)
    //Rotas    
    app.use('/api/usuario',UsuarioRouter(usuarioController))
    app.post('/api/login', (req, res) => loginController.realizarLogin(req, res));
    app.use(tokenMiddleware.verificarAcesso.bind(tokenMiddleware));
    app.use('/api/categoria',CategoriaRouter(categoriaController))
    app.use('/api/produto',ProdutoRouter(produtoController))
    app.use('/api/recompensa',RecompensaRouter(recompensaController))
    app.use('/api/apoio',ApoioRouter(apoioController))
    



    app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    })

})