import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insere categorias
        await queryRunner.query(`
            INSERT INTO categoria (nome) VALUES 
            ('Tecnologia'),
            ('Arte'),
            ('Limpeza'),
            ('Musica'),
            ('Esportes')
            ON CONFLICT (nome) DO NOTHING;
        `);
        
        // Ou insere um usuário admin se necessário
        await queryRunner.query(`
            INSERT INTO usuario (nome, email, senha, tipo) VALUES 
            ('Admin', 'admin@email.com', 'senha_criptografada', 'admin')
            ON CONFLICT (email) DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM categoria WHERE nome IN ('Tecnologia', 'Arte', 'Games', 'Musica', 'Filmes')`);
        await queryRunner.query(`DELETE FROM usuario WHERE email = 'admin@email.com'`);
    }
}