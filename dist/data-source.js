"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const categoria_1 = require("./Model/categoria");
const produto_1 = require("./Model/produto");
const recompensa_1 = require("./Model/recompensa");
const usuario_1 = require("./Model/usuario");
const apoio_1 = require("./Model/apoio");
console.log('=== DATABASE CONFIG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
// Use a URL apenas quando em produção
const config = process.env.DATABASE_URL
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [categoria_1.Categoria, produto_1.Produto, recompensa_1.Recompensa, usuario_1.Usuario, apoio_1.Apoio],
        migrations: [__dirname + '/../migrations/*.js'], // Migrations compiladas para JS
        migrationsTableName: "migrations",
        migrationsRun: true,
        synchronize: false,
        logging: true,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
    : {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'floripa96',
        database: 'crowdfunding',
        synchronize: true,
        logging: true,
        entities: [categoria_1.Categoria, produto_1.Produto, recompensa_1.Recompensa, usuario_1.Usuario, apoio_1.Apoio], // MESMAS ENTITIES
        migrations: ["src/migrations/*.ts"], // Em desenvolvimento usa TS
        migrationsTableName: "migrations",
        migrationsRun: false
    };
console.log('Using config:', process.env.DATABASE_URL ? 'PRODUCTION' : 'DEVELOPMENT');
exports.AppDataSource = new typeorm_1.DataSource(config);
