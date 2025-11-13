import { DataSource } from 'typeorm';
import { Categoria } from './Model/categoria';
import { Produto } from './Model/produto';
import { Recompensa } from './Model/recompensa';
import { Usuario } from './Model/usuario';
import { Apoio } from './Model/apoio';

console.log('=== DATABASE CONFIG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

// Usa a URL apenas quando em produção
const config = process.env.DATABASE_URL 
  ? {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      entities: [Categoria, Produto, Recompensa, Usuario, Apoio], 
      migrations: [__dirname + '/migrations/*.js'],
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
      type: 'postgres' as const,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'floripa96',
      database: 'crowdfunding',
      synchronize: false,
      logging: true,
      entities: [Categoria, Produto, Recompensa, Usuario, Apoio],
      migrations: ["src/migrations/*.ts"],
      migrationsTableName: "migrations",
      migrationsRun: false
    };

console.log('Using config:', process.env.DATABASE_URL ? 'PRODUCTION' : 'DEVELOPMENT');

export const AppDataSource = new DataSource(config);