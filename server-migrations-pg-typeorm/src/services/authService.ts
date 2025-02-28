// import { IUser, User } from "../models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../config/data-source";
import { SECRET_KEY } from "../db/envs";

export const registerService = async (username: string, email: string, password: string ) => {
  // 1. Validar que no exista el email y el username
  // Validaciones de username, email y password (opcional: usar zod).

  const validateEmail = await UserModel.findOne({ where: {email} });
  const validateUsername = await UserModel.findOne({where: {username}});

  if (validateEmail) {
    throw new Error("El correo ya existe!");
  }

  if (validateUsername) {
    throw new Error("El nombre de usuario ya existe!");
  }

  // 2. Encriptar la password
  const hashPassword = await bcrypt.hash(password, 10);

  // 3. Crear el usuario en la DB
  const userCreated = UserModel.create({
    username,
    email,
    password: hashPassword,
  });

  // 4. guardamos el usuario creado en la DB
  await UserModel.save(userCreated);

  return {
    id: userCreated.id,
    username: userCreated.username,
    email: userCreated.email,
  };
};

export const loginService = async (email: string, password: string) => {
  // 1. Asegurar que el usuario esta registrado (Atravez del email)
  const user = await UserModel.findOne({ where: {email} });
  if(!SECRET_KEY){
    throw new Error('No hay una llave secreta - JWT')
  }
  
  const token = jwt.sign(
    {  _id: user?.id, username: user?.username, email: user?.email } , SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  if (!user) throw new Error("El correo no esta registrado");

  // 2. Asegurar que el usuario es valido usando el (compare)
  // Aqui comparamos el pass que nos pasan y el de la base de datos=> devuelve true-false
  const isValid = await bcrypt.compare(password, user.password);

  // 3. Validar la contrasena (si ess incorrecta lanza error)
  if (!isValid) {
    throw new Error("La contrasena es invalida");
  }

  return { user, token };
};
