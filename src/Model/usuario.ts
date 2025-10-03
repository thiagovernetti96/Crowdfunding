import { Column, Entity, PrimaryGeneratedColumn,TableInheritance } from "typeorm"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class Usuario {
 
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    nome?: string
    @Column()
    email?: string
    @Column()
    senha?: string
    
}
