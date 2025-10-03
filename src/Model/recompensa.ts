import{Column,Entity,PrimaryGeneratedColumn,ManyToOne } from "typeorm"
import { Produto } from "./produto"
@Entity()
export class Recompensa{
  @PrimaryGeneratedColumn()
  id?:number
  @ManyToOne(()=>Produto,{eager:false})
  produto?:Produto
  @Column()
  nome?:string
  @Column()
  descricao?:string
  @Column()
  valor_minimo?:number
  @Column()
  quantidade_maxima?:number
  @Column()
  quantidade_disponivel?:number


}