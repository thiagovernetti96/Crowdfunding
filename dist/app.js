"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const usuario_1 = require("./Model/usuario");
const categoria_1 = require("./Model/categoria");
const CategoriaService_1 = require("./Service/CategoriaService");
const CategoriaController_1 = require("./Controller/CategoriaController");
const CategoriaRouter_1 = require("./Routes/CategoriaRouter");
const UsuarioService_1 = require("./Service/UsuarioService");
const UsuarioController_1 = require("./Controller/UsuarioController");
const UsuarioRouter_1 = require("./Routes/UsuarioRouter");
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
console.log('🟢 APP.TS INICIADO - Carregando dependências...');
require("reflect-metadata");
const data_source_1 = require("./data-source");
console.log('🟢 DataSource importado, tentando inicializar...');
console.log('🔍 DATABASE_URL no app.ts:', process.env.DATABASE_URL ? 'PRESENTE' : 'AUSENTE');
console.log('🔍 NODE_ENV no app.ts:', process.env.NODE_ENV);
data_source_1.AppDataSource.initialize().then(async () => {
    const app = (0, express_1.default)();
    const cors = require('cors');
    app.use(cors({
        origin: '*',
    }));
    const PORT = Number(process.env.PORT) || 3000;
    app.use(express_1.default.json());
    //Inicializar Dependencias
    // Categoria
    const CategoriaRepository = data_source_1.AppDataSource.getRepository(categoria_1.Categoria);
    const categoriaService = new CategoriaService_1.CategoriaService(CategoriaRepository);
    const categoriaController = new CategoriaController_1.CategoriaController(categoriaService);
    //Pessoa  Usuário
    const UsuarioRepository = data_source_1.AppDataSource.getRepository(usuario_1.Usuario);
    const usuarioService = new UsuarioService_1.UsuarioService(UsuarioRepository);
    const usuarioController = new UsuarioController_1.UsuarioController(usuarioService);
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
    // Rotas PÚBLICAS 
    app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
    app.use('/api/usuario', (0, UsuarioRouter_1.UsuarioRouter)(usuarioController));
    app.use('/api/categoria', (0, CategoriaRouter_1.CategoriaRouter)(categoriaController));
    app.use('/api/produto', (0, ProdutoRouter_1.ProdutoRouter)(produtoController));
    app.use('/api/recompensa', (0, RecompensaRouter_1.RecompensaRouter)(recompensaController));
    app.post('/api/login', (req, res) => loginController.realizarLogin(req, res));
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
    app.use('/api/apoio', (0, ApoioRouter_1.ApoioRouter)(apoioController, tokenMiddleware));
    //Ver status das migrations
    app.get('/api/debug/migrations-status', async (req, res) => {
        try {
            // Verifica se a tabela migrations existe
            const migrationsTableExists = await data_source_1.AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'migrations'
      )
    `);
            let migrations = [];
            if (migrationsTableExists[0].exists) {
                migrations = await data_source_1.AppDataSource.query('SELECT * FROM migrations ORDER BY id DESC');
            }
            // Lista todas as tabelas
            const tables = await data_source_1.AppDataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
            res.json({
                migrationsTableExists: migrationsTableExists[0].exists,
                migrations: migrations,
                tables: tables.map(t => t.table_name),
                config: {
                    migrationsRun: data_source_1.AppDataSource.options.migrationsRun,
                    synchronize: data_source_1.AppDataSource.options.synchronize
                }
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
