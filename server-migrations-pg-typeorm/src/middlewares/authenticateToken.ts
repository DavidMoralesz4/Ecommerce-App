import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

interface IPayload {
  _id: string
  username: string
  email: string
  iat: number
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.acces_token;
  if (!token) {
    res.status(401).json({ message: "Acceso denegado" });
    return; // Detén la ejecución aquí
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY)as IPayload;
    req.userId = payload._id
    next(); // Pasa el control al siguiente middleware
  } catch (error) {
    res.status(403).json({ message: "Token inválido" });
  }
};