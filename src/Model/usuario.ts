import { Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()

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
