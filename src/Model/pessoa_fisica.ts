import { Column, Entity, ChildEntity ,PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "./usuario"

@ChildEntity("PessoaFisica")
export class PessoaFisica extends Usuario {
  @Column()
  cpf?:String
  @Column()
  data_nascimento?:Date
}