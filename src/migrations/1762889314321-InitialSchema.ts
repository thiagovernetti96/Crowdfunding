import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
    name = 'InitialSchema1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS categoria (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL UNIQUE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                tipo VARCHAR(50) DEFAULT 'usuario'
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS produto (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                descricao TEXT,
                meta_arrecadacao DECIMAL(10,2),
                data_limite TIMESTAMP,
                imagem_capa VARCHAR(500),
                categoria_id INTEGER REFERENCES categoria(id),
                usuario_id INTEGER REFERENCES usuario(id),
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS recompensa (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT,
                valor_minimo DECIMAL(10,2),
                produto_id INTEGER REFERENCES produto(id)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS apoio (
                id SERIAL PRIMARY KEY,
                valor DECIMAL(10,2) NOT NULL,
                data_apoio TIMESTAMP DEFAULT NOW(),
                usuario_id INTEGER REFERENCES usuario(id),
                produto_id INTEGER REFERENCES produto(id),
                recompensa_id INTEGER REFERENCES recompensa(id)
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