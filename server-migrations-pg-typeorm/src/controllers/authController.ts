import { Request, Response } from "express";
import { loginService, registerService } from "../services/authService";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { token } = await loginService(email, password);

    res.cookie("acces_token", token, {
      httpOnly: true, // La cookie solo se puede acceder en el servidor
      secure: process.env.NODE_ENV === "production", // La cookie solo se puede acceder en https
      sameSite: "strict", // La cookie solo se puede acceder en el mismo dominio
      maxAge: 1000 * 60 * 60, // La cookie tiene un tiempo de validacion de 1 hora
    });

    res.status(200).json({ message: "Has iniciado sesion!" });
    return;
  } catch (error) {
    res.status(401).json({ error: "Error al iniciar sesion!" });
    return;
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    await registerService(username, email, password);

    res.status(200).json({ message: "Te has registrado exitosamente!" });
  } catch (error) {
    res.status(400).json({ error: "Error al registrarse" });
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("acces_token"); // Limpiar cookie
  res.status(200).json({ message: "Sesion cerrada" });
};
