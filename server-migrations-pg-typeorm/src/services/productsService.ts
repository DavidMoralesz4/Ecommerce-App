import csvParser from "csv-parser";
import fs from "fs";
import { Product } from "../models/Products";

export const createProductsFromCSV = (
  filePath: string,
  userId: any
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      return reject(new Error("id_user es obligatorio."));
    }
    const errors: any[] = []; // Para registrar errores durante la creación de productos

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          console.log("Creando producto con id_user:", userId); // Depurar el id_user
          const product = new Product({
            nombre: row.nombre,
            descripcion: row.descripcion,
            imagen: row.imagen,
            precio: parseFloat(row.precio),
            unidad: parseInt(row.unidad, 10),
            categoria: row.categoria,
            userId: userId, // Verifica que userId es válido aquí
            marca: row.marca,
          });

          await product.save();
        } catch (error) {
          console.error("Error al guardar producto:", error);
          errors.push({ row, error }); // Agregar información del error
        }
      })
      .on("end", () => {
        if (errors.length > 0) {
          console.error("Errores durante la creación de productos:", errors);
          return reject(
            new Error(
              `Se encontraron errores al procesar algunos productos. Total errores: ${errors.length}`
            )
          );
        }
        resolve();
      })
      .on("error", (error) => {
        console.error("Error al procesar el archivo CSV:", error);
        reject(new Error("Error al procesar el archivo CSV."));
      });
  });
};

/* Este servicio para traer categorias */
export const categoryService = async (userId: string, categoria: string) => {
  try {
    const products = await Product.find({ userId, categoria });
    return products;
  } catch (error: any) {
    throw new Error(
      `Error al obtener productos por usuario y categoría: ${error.message}`
    );
  }
};

export const brandService = async (
  userId: string,
  categoria: string,
  marca: string
) => {
  try {
    const products = await Product.find({ userId, categoria, marca });
    return products;
  } catch (error: any) {
    throw new Error(
      `Error al obtener productos por usuario y categoría: ${error.message}`
    );
  }
};

export const getProdService = async (userId: string) => {
  try {
    const products = await Product.find({ userId }).exec(); // Busca productos por el ID del usuario
    return products;
  } catch (error) {
    console.error("Error en getProdService:", error);
    throw new Error("Error al obtener productos.");
  }
};
