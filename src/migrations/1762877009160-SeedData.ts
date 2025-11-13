import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1700000000001 implements MigrationInterface {
    name = 'SeedInitialData1700000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insere categorias apenas se não existirem
        await queryRunner.query(`
            INSERT INTO categoria (nome) 
            SELECT 'Tecnologia' WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nome = 'Tecnologia')
        `);
        await queryRunner.query(`
            INSERT INTO categoria (nome) 
            SELECT 'Arte' WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nome = 'Arte')
        `);
        await queryRunner.query(`
            INSERT INTO categoria (nome) 
            SELECT 'Limpeza' WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nome = 'Limpeza')
        `);
        await queryRunner.query(`
            INSERT INTO categoria (nome) 
            SELECT 'Musica' WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nome = 'Musica')
        `);
        await queryRunner.query(`
            INSERT INTO categoria (nome) 
            SELECT 'Esportes' WHERE NOT EXISTS (SELECT 1 FROM categoria WHERE nome = 'Esportes')
        `);
        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM categoria WHERE nome IN ('Tecnologia', 'Arte', 'Limpeza', 'Musica', 'Esportes')`);
        
    }
}