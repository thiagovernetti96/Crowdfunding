import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, AfterLoad } from "typeorm"
import { Categoria } from "./categoria"
import { Apoio } from "./apoio"
import { Usuario } from "./usuario"

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  nome?: string

  @Column()
  descricao?: string

  @Column()
  valor_meta?: number

  valor_arrecadado?: number

  @ManyToOne(() => Categoria, { eager: true })
  categoria?: Categoria

  @ManyToOne(() => Usuario, { eager: true })
  criador?: Usuario

  // Mantemos o campo original para compatibilidade
  @Column({ nullable: true })
  imagem_capa?: string

  // Novo campo para armazenar o nome do arquivo
  @Column({ nullable: true })
  imagem_capa_filename?: string

  @AfterLoad()
  updateImagePath() {
    if (this.imagem_capa_filename) {
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
      this.imagem_capa = `${baseUrl}/uploads/${this.imagem_capa_filename}`;
    }
  }
}



