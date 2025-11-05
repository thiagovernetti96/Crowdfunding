import { DataSource } from 'typeorm';
import { Categoria } from './Model/categoria';
import { Produto } from './Model/produto';
import { Recompensa } from './Model/recompensa';
import { Usuario } from './Model/usuario';
import { Apoio } from './Model/apoio';

// Configuração para desenvolvimento (local)
const devConfig = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'floripa96',
  database: 'crowdfunding',
  synchronize: true,
  logging: true,
  entities: [Categoria, Produto, Recompensa, Usuario, Apoio],
  migrations: [],
  subscribers: [],
};

// Configuração para produção (Render)
const prodConfig = {
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  synchronize: false, 
  logging: false,
  entities: [Categoria, Produto, Recompensa, Usuario, Apoio],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

// Escolhe a configuração baseada no ambiente
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export const AppDataSource = new DataSource(config);

// Log para debug
console.log('Ambiente:', process.env.NODE_ENV || 'development');
console.log('Database:', process.env.NODE_ENV === 'production' ? 'Produção (Render)' : 'Desenvolvimento (Local)');