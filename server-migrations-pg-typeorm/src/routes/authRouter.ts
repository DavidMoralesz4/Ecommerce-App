import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController";

export const authRouter: Router = Router();


authRouter.post("/login", loginController);

/// Solo yo puedo registrar los usuarios
authRouter.post("/register", registerController);


authRouter.post("/logout", logoutController);
