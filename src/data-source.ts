import { DataSource } from 'typeorm';
import { Categoria } from './Model/categoria';
import { Produto } from './Model/produto';
import { Recompensa } from './Model/recompensa';
import { Usuario } from './Model/usuario';
import { Apoio } from './Model/apoio';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Para produção no Render
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3000'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'floripa96',
  database: process.env.DB_NAME || 'crowdfunding',
  synchronize: process.env.NODE_ENV !== 'production', // true apenas em dev
  logging: process.env.NODE_ENV !== 'production', // true apenas em dev
  entities: [Categoria, Produto, Recompensa, Usuario, Apoio],
  migrations: [],
  subscribers: [],
  ...(process.env.NODE_ENV === 'production' && {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  })
});
