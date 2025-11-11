import express,{Request,Response} from "express"; 
import path from 'path';
import 'dotenv/config';
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
console.log('🟢 APP.TS INICIADO - Carregando dependências...');
import "reflect-metadata";
import { AppDataSource } from './data-source';

console.log('🟢 DataSource importado, tentando inicializar...');
console.log('🔍 DATABASE_URL no app.ts:', process.env.DATABASE_URL ? 'PRESENTE' : 'AUSENTE');
console.log('🔍 NODE_ENV no app.ts:', process.env.NODE_ENV);

AppDataSource.initialize().then(async () => {
    const app = express();
    const cors = require('cors');
    app.use(cors({
      origin:'*',
    }))
    const PORT = Number(process.env.PORT) || 3000;
    app.use(express.json());
    //Inicializar Dependencias
    // Categoria
    const CategoriaRepository = AppDataSource.getRepository(Categoria);
    const categoriaService = new CategoriaService(CategoriaRepository);
    const categoriaController = new CategoriaController(categoriaService);
    //Pessoa  Usuário
    const UsuarioRepository = AppDataSource.getRepository(Usuario);
    const usuarioService = new UsuarioService(UsuarioRepository);
    const usuarioController = new UsuarioController(usuarioService);

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
  // Rotas PÚBLICAS 
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));    
  app.use('/api/usuario', UsuarioRouter(usuarioController));
  app.use('/api/categoria', CategoriaRouter(categoriaController));
  app.use('/api/produto', ProdutoRouter(produtoController));
  app.use('/api/recompensa', RecompensaRouter(recompensaController));
  app.post('/api/login', (req:Request, res:Response) => loginController.realizarLogin(req, res));
  // Adicionando isso temporariamente
  //app.get('/api/test-api-key', (req, res) => {
  //console.log("🔍 Todas as variáveis de ambiente:", process.env);
  //console.log("🔍 API Key específica:", process.env.ABACATE_PAY_API_KEY);
  
  //res.json({ 
    //apiKeyPresent: !!process.env.ABACATE_PAY_API_KEY,
    //apiKeyValue: process.env.ABACATE_PAY_API_KEY || 'NÃO ENCONTRADA',
    //allEnvKeys: Object.keys(process.env).filter(key => key.includes('ABACATE') || key.includes('API'))
  //});
//});

  // Rotas PROTEGIDAS
  app.use('/api/apoio', ApoioRouter(apoioController, tokenMiddleware));

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });

})