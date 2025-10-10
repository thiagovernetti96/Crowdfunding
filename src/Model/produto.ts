import{Column,Entity,PrimaryGeneratedColumn,ManyToOne, AfterLoad } from "typeorm"
import { Categoria } from "./categoria"
import { Apoio } from "./apoio"
import { Usuario } from "./usuario"

@Entity()
export class Produto{

  @PrimaryGeneratedColumn()
  id?:number
  @Column()
  nome?:string
  @Column()
  descricao?:string
  @Column()
  valor_meta?:number

  valor_arrecadado?:number

  @ManyToOne(()=>Categoria,{eager:false})
  categoria?:Categoria

  @ManyToOne(() => Usuario, { eager: true, nullable: true })
  criador?: Usuario

  @Column({ nullable: true })
  imagem_capa?:string
}







