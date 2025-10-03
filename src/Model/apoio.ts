import {Column,Entity,PrimaryGeneratedColumn,ManyToOne,JoinColumn,CreateDateColumn, DataSource } from "typeorm"
import { Usuario } from "./usuario"
import { Produto } from "./produto"
import { Recompensa } from "./recompensa"
import { PessoaFisica } from "./pessoa_fisica"
import { PessoaJuridica } from "./pessoa_juridica"

@Entity()
export class Apoio {

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  valor?: number

  @Column()
  pixId?: string

  @Column({ default: "PENDING" })
  status?: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_apoio?: Date

  @Column({ nullable: true })
  apoiadorPessoaFisicaId?: number|null

  @Column({ nullable: true })
  apoiadorPessoaJuridicaId?: number|null

  @Column()
  produtoId?: number

  @Column({ nullable: true })
  recompensaId?: number|null

  @ManyToOne(() => PessoaFisica, { eager: false,nullable: true })
  @JoinColumn({ name: "apoiadorPessoaFisicaId" })
  apoiadorPessoaFisica?: PessoaFisica

  @ManyToOne(() => PessoaJuridica, { eager: false,nullable: true })
  @JoinColumn({ name: "apoiadorPessoaJuridicaId" })
  apoiadorPessoaJuridica?: PessoaJuridica

  @ManyToOne(() => Produto, { eager: false })
  @JoinColumn({ name: "produtoId" })
  produto?: Produto

  @ManyToOne(() => Recompensa, { eager: false, nullable: true })
  @JoinColumn({ name: "recompensaId" })
  recompensa?: Recompensa

}
