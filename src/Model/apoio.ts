import {Column,Entity,PrimaryGeneratedColumn,ManyToOne,JoinColumn,CreateDateColumn, DataSource } from "typeorm"
import { Usuario } from "./usuario"
import { Produto } from "./produto"
import { Recompensa } from "./recompensa"

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

  @Column()
  apoiadorId?: number


  @Column()
  produtoId?: number

  @Column({ nullable: true })
  recompensaId?: number|null

  @ManyToOne(() => Usuario, { eager: false })
  @JoinColumn({ name: "apoiadorId" })
  apoiador?: Usuario

  @ManyToOne(() => Produto, { eager: false })
  @JoinColumn({ name: "produtoId" })
  produto?: Produto

  @ManyToOne(() => Recompensa, { eager: false, nullable: true })
  @JoinColumn({ name: "recompensaId" })
  recompensa?: Recompensa

}
