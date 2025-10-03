import { DataSource } from 'typeorm';
import { Categoria } from './Model/categoria';
import { PessoaFisica } from './Model/pessoa_fisica';
import { PessoaJuridica } from './Model/pessoa_juridica';
import { Produto } from './Model/produto';
import { Recompensa } from './Model/recompensa';
import {Usuario} from './Model/usuario';
import {Apoio} from './Model/apoio';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'floripa96',
  database: 'crowdfunding',
  synchronize: true,
  logging:true,
  entities: [Categoria,PessoaFisica,PessoaJuridica,Produto,Recompensa,Usuario,Apoio],
  migrations: [],
  subscribers: [],
  
});
const queryBuilder = AppDataSource.createQueryBuilder
console.log('Conectando ao banco:', AppDataSource.options.database);

