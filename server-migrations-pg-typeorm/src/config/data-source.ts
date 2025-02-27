import { DataSource } from "typeorm";
import { PASSWORD } from "../db/envs";
import { User } from "../entities/User";
import { Product } from "../entities/Products";
import { OrderProduct } from "../entities/OrderProduct";
import { Order } from "../entities/Order";
import { Client } from "../entities/Client";
import { Category } from "../entities/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: PASSWORD,
  database: "ecommerce_db",
  synchronize: true,
  logging: true,
  entities: [User, Product, OrderProduct, Order, Client, Category],
  subscribers: [],
  migrations: [],
});


//// Almacenando la entidad User
export const UserModel = AppDataSource.getRepository(User);

//// Almacenando la entidad Producto
export const ProductModel = AppDataSource.getRepository(Product);

//// Almacenando la entidad OrderProduct
export const OrderProductModel = AppDataSource.getRepository(OrderProduct);

//// Almacenando la entidad Order
export const OrderModel = AppDataSource.getRepository(Order);

//// Almacenando la entidad Client
export const ClientModel = AppDataSource.getRepository(Client);

//// Almacenando la entidad Category
export const CategoryModel = AppDataSource.getRepository(Category);
