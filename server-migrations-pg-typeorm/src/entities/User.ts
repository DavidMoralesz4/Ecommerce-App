import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Products";
import { Client } from "./Client";
import { Order } from "./Order";

// Convierto mi clase normal en una entidad

@Entity({
  name: "users", // Nombra siempre las tablas en plural
}) // users
export class User {
  @Column()
  @PrimaryGeneratedColumn() // Id que nunca se repite
  id: number;

  @Column({
    length: 100,
  })
  username: string; // DEFECTO VARCHAR(255)

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  // user para todas mis tablas -- identificar id
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
