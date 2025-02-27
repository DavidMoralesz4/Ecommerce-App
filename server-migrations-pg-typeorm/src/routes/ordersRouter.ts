import { Router } from "express";
import { createOrderController, getOrdersController } from "../controllers/ordersController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const ordersRoute: Router = Router()

ordersRoute.post("/orders/create", authenticateToken, createOrderController)
ordersRoute.get("/orders", authenticateToken, getOrdersController)
