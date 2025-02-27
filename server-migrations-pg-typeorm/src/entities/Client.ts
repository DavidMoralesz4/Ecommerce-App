import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Order } from "./Order";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  document: string;

  @Column("text")
  address: string;

  @ManyToOne(() => User, (user) => user.clients, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
