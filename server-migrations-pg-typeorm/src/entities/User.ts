import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

// Convierto mi clase normal en una entidad

@Entity({
    name: 'users'   // Nombra siempre las tablas en plural
}) // users

export class User {
    @Column()
    @PrimaryGeneratedColumn() // Id que nunca se repite
    id: number

    @Column({
        length: 100
    })
    username: string // DEFECTO VARCHAR(255)
    
    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string
}



