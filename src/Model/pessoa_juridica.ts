import {  Column, Entity, ChildEntity ,PrimaryGeneratedColumn } from "typeorm"
import { Usuario } from "./usuario"

@ChildEntity("PessoaJuridica")
export class PessoaJuridica extends Usuario{
 @Column()
 cnpj?:String
 @Column()
 razao_social?:string



}
