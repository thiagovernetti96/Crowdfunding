"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const categoria_1 = require("./Model/categoria");
const pessoa_fisica_1 = require("./Model/pessoa_fisica");
const pessoa_juridica_1 = require("./Model/pessoa_juridica");
const produto_1 = require("./Model/produto");
const recompensa_1 = require("./Model/recompensa");
const usuario_1 = require("./Model/usuario");
const apoio_1 = require("./Model/apoio");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'floripa96',
    database: 'crowdfunding',
    synchronize: true,
    logging: true,
    entities: [categoria_1.Categoria, pessoa_fisica_1.PessoaFisica, pessoa_juridica_1.PessoaJuridica, produto_1.Produto, recompensa_1.Recompensa, usuario_1.Usuario, apoio_1.Apoio],
    migrations: [],
    subscribers: [],
});
console.log('Conectando ao banco:', exports.AppDataSource.options.database);
