import { Request, Response } from "express";
import { createOrderService, getOrderService } from "../services/ordersService";

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    if(!req.userId){
      res.status(400).json({message: "Id del usuario es requerido, Por favor inicia sesion!"})
      return
    }

    const orders = await getOrderService(req.userId);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en las ordenes." });
  }
};

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { document, order } = req.body;

    if (!document || !order || !Array.isArray(order) || order.length === 0) {
      res.status(400).json({ error: "Cliente y productos son requeridos." });
    }

    if(!req.userId) {
      res.status(400).json({message: "Id del usuario es requerido, Por favor inicia sesion!"})
      return
    }

    const newOrder = await createOrderService(document, order, req.userId);

    res.status(200).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la orden." });
  }
};
