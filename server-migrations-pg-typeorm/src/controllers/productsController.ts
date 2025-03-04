import { Request, Response } from "express";
import {
  // brandService,
  categoryService,
  createProductsFromCSV,
  getProdService,
} from "../services/productsService";

export const allProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(400).json({ message: "ID de usuario no proporcionado" });
      return;
    }

    const products = await getProdService(req.userId);

    if (!products || products.length === 0) {
      res
        .status(401)
        .json({ message: "No se encontraron productos para este usuario." });
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor..." });
  }
};

export const uploadProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No se envió ningún archivo" });
      return;
    }

    const filePath = req.file?.path; // Ruta del archivo cargado
    const userId = req.userId;
    
    // Llamar al servicio para procesar el CSV
    await createProductsFromCSV(filePath, Number(userId));

    res
      .status(201)
      .json({ message: "Productos creados exitosamente desde el archivo CSV" });
    return;
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
    return;
  }
};

export const getCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoria } = req.params; // Categoría opcional desde la query
  try {
    const userId = req.userId
    // Busca todos los productos con esa categoría
    if (!userId) {
      res.status(400).json({ message: "ID de usuario no proporcionado" });
      return;
    }

    const products = await categoryService(Number(userId), categoria);

    if (products.length === 0) {
      res
        .status(401)
        .json({ message: "No se encontraron productos en esta categoría." });
      return;
    }
    // Retorna los productos relacionados
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    res.status(500).json({ message: "Error interno del servidor." });
    return;
  }
};

// export const getBrandController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { categoria } = req.params; // Categoría opcional desde la query
//   const { marca } = req.params; // Categoría opcional desde la query

//   try {
//     // Busca todos los productos con esa categoría
//     if (!req.userId) {
//       res.status(400).json({ message: "ID de usuario no proporcionado" });
//       return;
//     }

//     const products = await brandService(req.userId, categoria, marca);

//     if (products.length === 0) {
//       res
//         .status(401)
//         .json({ message: "No se encontraron productos en esta categoría." });
//       return;
//     }
//     // Retorna los productos relacionados
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error al obtener productos por categoría:", error);
//     res.status(500).json({ message: "Error interno del servidor." });
//     return;
//   }
// };
