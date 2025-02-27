import { Router } from "express";
import upload from "../middlewares/middleware";
import {
  allProductsController,
  getBrandController,
  getCategoryController,
  uploadProducts,
} from "../controllers/productsController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const productRouter: Router = Router();

productRouter.get("/products", authenticateToken, allProductsController);

productRouter.get("/products/:categoria", authenticateToken, getCategoryController);

productRouter.get("/products/:categoria/:marca", authenticateToken, getBrandController);

productRouter.post(
  "/products/create/csv",
  upload.single("file"),
  authenticateToken,
  uploadProducts
);
