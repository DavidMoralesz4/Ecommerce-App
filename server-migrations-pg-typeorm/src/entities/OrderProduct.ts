import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Products";

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: "CASCADE" })
    order: Order;

    @ManyToOne(() => Product, (product) => product.orderProducts, { onDelete: "CASCADE" })
    product: Product;

    @Column()
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    unitPrice: number;
}
