import { DataSource } from "typeorm";
import { PASSWORD } from "../db/envs";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: PASSWORD,
    database: "demo_typeorm",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [] ,
    migrations: [],
})

//// Almacenando la entidad User
export const UserModel = AppDataSource.getRepository(User);