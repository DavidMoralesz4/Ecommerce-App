import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController";
import { authenticateToken } from "../middlewares/authenticateToken";
import { dashboardController } from "../controllers/productsController";


export const authRouter: Router = Router();

authRouter.get("/dashboard", authenticateToken, dashboardController);

authRouter.post("/login", loginController);

authRouter.post("/register", registerController);


authRouter.post("/logout", logoutController);
