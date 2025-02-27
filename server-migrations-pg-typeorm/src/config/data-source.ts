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
    logging: false,
    entities: [User, Product, OrderProduct, Order, Client, Category],
    subscribers: [] ,
    migrations: [],
})

//// Almacenando la entidad User


export const UserModel = AppDataSource.getRepository(User);
