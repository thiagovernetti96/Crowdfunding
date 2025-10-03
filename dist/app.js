"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = require("./Model/usuario");
const categoria_1 = require("./Model/categoria");
const CategoriaService_1 = require("./Service/CategoriaService");
const CategoriaController_1 = require("./Controller/CategoriaController");
const CategoriaRouter_1 = require("./Routes/CategoriaRouter");
const pessoa_fisica_1 = require("./Model/pessoa_fisica");
const PessoaFisicaService_1 = require("./Service/PessoaFisicaService");
const PessoaFisicaController_1 = require("./Controller/PessoaFisicaController");
const PessoaFisicaRouter_1 = require("./Routes/PessoaFisicaRouter");
const pessoa_juridica_1 = require("./Model/pessoa_juridica");
const PessoaJuridicaService_1 = require("./Service/PessoaJuridicaService");
const PessoaJuridicaController_1 = require("./Controller/PessoaJuridicaController");
const PessoaJuridicaRouter_1 = require("./Routes/PessoaJuridicaRouter");
const produto_1 = require("./Model/produto");
const ProdutoService_1 = require("./Service/ProdutoService");
const ProdutoController_1 = require("./Controller/ProdutoController");
const ProdutoRouter_1 = require("./Routes/ProdutoRouter");
const recompensa_1 = require("./Model/recompensa");
const RecompensaService_1 = require("./Service/RecompensaService");
const RecompensaController_1 = require("./Controller/RecompensaController");
const RecompensaRouter_1 = require("./Routes/RecompensaRouter");
const apoio_1 = require("./Model/apoio");
const ApoioService_1 = require("./Service/ApoioService");
const ApoioController_1 = require("./Controller/ApoioController");
const ApoioRouter_1 = require("./Routes/ApoioRouter");
const LoginService_1 = require("./Service/LoginService");
const LoginController_1 = require("./Controller/LoginController");
const TokenMiddleware_1 = require("./Middleware/TokenMiddleware");
require("reflect-metadata");
const data_source_1 = require("./data-source");
const TestRouter_1 = require("./Routes/TestRouter");
data_source_1.AppDataSource.initialize().then(async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const cors = require('cors');
    app.use(cors({
        origin: '*',
    }));
    const port = 3000;
    app.use(express_1.default.json());
    //Inicializar Dependencias
    // Categoria
    const CategoriaRepository = data_source_1.AppDataSource.getRepository(categoria_1.Categoria);
    const categoriaService = new CategoriaService_1.CategoriaService(CategoriaRepository);
    const categoriaController = new CategoriaController_1.CategoriaController(categoriaService);
    //Pessoa Fisica
    const PessoaFisicaRepository = data_source_1.AppDataSource.getRepository(pessoa_fisica_1.PessoaFisica);
    const pessoFisicaService = new PessoaFisicaService_1.PessoaFisicaService(PessoaFisicaRepository);
    const pessoaFisicaController = new PessoaFisicaController_1.PessoaFisicaController(pessoFisicaService);
    //Pessoa Juridica
    const PessoaJuridicaRepository = data_source_1.AppDataSource.getRepository(pessoa_juridica_1.PessoaJuridica);
    const pessoJuridicaService = new PessoaJuridicaService_1.PessoaJuridicaService(PessoaJuridicaRepository);
    const pessoaJuridicaController = new PessoaJuridicaController_1.PessoaJuridicaController(pessoJuridicaService);
    //Produto
    const ProdutoRepository = data_source_1.AppDataSource.getRepository(produto_1.Produto);
    const produtoService = new ProdutoService_1.ProdutoService(ProdutoRepository);
    const produtoController = new ProdutoController_1.ProdutoController(produtoService);
    //Recompensa
    const RecompensaRepository = data_source_1.AppDataSource.getRepository(recompensa_1.Recompensa);
    const recompensaService = new RecompensaService_1.RecompensaService(RecompensaRepository);
    const recompensaController = new RecompensaController_1.RecompensaController(recompensaService);
    //Apoio
    const apoioRepository = data_source_1.AppDataSource.getRepository(apoio_1.Apoio);
    const apoioService = new ApoioService_1.ApoioService();
    const apoioController = new ApoioController_1.ApoioController();
    //Login 
    const usuarioRepository = data_source_1.AppDataSource.getRepository(usuario_1.Usuario);
    const loginService = new LoginService_1.LoginService(usuarioRepository);
    const loginController = new LoginController_1.LoginController(loginService);
    //Midleware TokenMiddleware
    const tokenMiddleware = new TokenMiddleware_1.TokenMiddleware(loginService);
    //Rotas
    console.log("Controller pessoa fisica:", pessoaFisicaController);
    app.use('/api/pessoafisica', (0, PessoaFisicaRouter_1.PessoaFisicaRouter)(pessoaFisicaController));
    app.use('/api/pessoajuridica', (0, PessoaJuridicaRouter_1.PessoaJuridicaRouter)(pessoaJuridicaController));
    //app.post('/api/login', (req, res) => loginController.realizarLogin(req, res));
    //app.use(tokenMiddleware.verificarAcesso.bind(tokenMiddleware));
    app.use('/api/categoria', (0, CategoriaRouter_1.CategoriaRouter)(categoriaController));
    app.use('/api/produto', (0, ProdutoRouter_1.ProdutoRouter)(produtoController));
    app.use('/api/recompensa', (0, RecompensaRouter_1.RecompensaRouter)(recompensaController));
    app.use('/api/apoio', (0, ApoioRouter_1.ApoioRouter)(apoioController));
    app.use('/api/teste', TestRouter_1.TestRouter);
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});
