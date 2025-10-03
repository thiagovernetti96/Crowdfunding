import{Column,Entity,PrimaryGeneratedColumn,ManyToOne, AfterLoad } from "typeorm"
import { Categoria } from "./categoria"
import { PessoaFisica } from "./pessoa_fisica"
import { PessoaJuridica } from "./pessoa_juridica"
import { Apoio } from "./apoio"

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

  @ManyToOne(() => PessoaFisica, { eager: true, nullable: true })
  criadorPessoaFisica?: PessoaFisica

  @ManyToOne(() => PessoaJuridica, { eager: true, nullable: true })
  criadorPessoaJuridica?: PessoaJuridica

  @Column({ nullable: true })
  imagem_capa?:string
}







