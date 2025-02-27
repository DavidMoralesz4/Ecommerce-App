import { Router } from "express";
import { createClientController } from "../controllers/clientsController";

export const clientsRoute: Router = Router()

clientsRoute.post('/clients/create', createClientController)