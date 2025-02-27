import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { OrderProduct } from "./OrderProduct";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column()
  image: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  unit: string;

  @ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "SET NULL",
    nullable: true,
  })
  category: Category;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
