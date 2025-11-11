import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
    name = 'InitialSchema1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tabela categoria
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS categoria (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL UNIQUE
            )
        `);

        // Tabela usuario
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                tipo VARCHAR(50) DEFAULT 'usuario'
            )
        `);

        //Tabela Produto
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS produto (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT,
                valor_meta DECIMAL(10,2),
                imagem_capa VARCHAR(500),
                imagem_capa_filename VARCHAR(500),
                categoria_id INTEGER REFERENCES categoria(id),
                criador_id INTEGER REFERENCES usuario(id),
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);

        //Tabela Recompensa
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS recompensa (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT,
                valor_minimo DECIMAL(10,2),
                produto_id INTEGER REFERENCES produto(id)
            )
        `);

        // Tabela apoio
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS apoio (
                id SERIAL PRIMARY KEY,
                valor DECIMAL(10,2) NOT NULL,
                pix_id VARCHAR(255),
                status VARCHAR(50) DEFAULT 'PENDING',
                data_apoio TIMESTAMP DEFAULT NOW(),
                apoiador_id INTEGER REFERENCES usuario(id),
                produto_id INTEGER REFERENCES produto(id)
                -- recompensa_id é opcional
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS apoio`);
        await queryRunner.query(`DROP TABLE IF EXISTS recompensa`);
        await queryRunner.query(`DROP TABLE IF EXISTS produto`);
        await queryRunner.query(`DROP TABLE IF EXISTS usuario`);
        await queryRunner.query(`DROP TABLE IF EXISTS categoria`);
    }
}