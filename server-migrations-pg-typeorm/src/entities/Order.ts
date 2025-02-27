import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { Client } from "./Client";
import { User } from "./User";
import { OrderProduct } from "./OrderProduct";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dateOrder: Date;

    @ManyToOne(() => Client, (client) => client.orders, { onDelete: "CASCADE" })
    client: Client;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total: number;

    @Column({ type: "enum", enum: ["pendiente", "pago", "rechazado"], default: "pendiente" })
    status: string;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];
}
