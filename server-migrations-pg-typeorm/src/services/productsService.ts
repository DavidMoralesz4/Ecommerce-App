import csvParser from "csv-parser";
import fs from "fs";
import { CategoryModel, ProductModel, UserModel } from "../config/data-source";

export const createProductsFromCSV = async(
  filePath: string,
  userId: number
): Promise<void> => {
  
  if (!userId) {
    throw new Error("id_user es obligatorio.");
  }

  const user = await UserModel.findOne({where: {id: userId}})
  if(!user) {
    throw new Error("El usuario no existe.")
  }

  const errors: any[] = []; // Para registrar errores durante la creación de productos
  const products: any[] = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          console.log("Creando producto con id_user:", userId); // Depurar el id_user
          
          let  category = await CategoryModel.findOne({where: {name: row.categoria}})
          // en caso de no haber categoria creala.s
          if(!category) {
            category = CategoryModel.create({name: row.categoria})
            // Guarda la categoria
            await CategoryModel.save(category)
          }


          const product = ProductModel.create({
            name: row.nombre,
            description: row.descripcion,
            image: row.imagen,
            price: parseFloat(row.precio),
            unit: parseInt(row.unidad, 10),
            category: category, // Asigna la relación de categoría
            user: user, // Asigna la relación de usuario
          });

           products.push(product);
        } catch (error) {
          console.error("Error al guardar producto:", error);
          errors.push({ row, error }); // Agregar información del error
        }
      })
      .on("end", async () => {
        try {
          await ProductModel.save(products); // Guardar todos los productos a la vez

          if (errors.length > 0) {
            console.error("Errores durante la creación de productos:", errors);
            return reject(new Error(`Se encontraron errores en ${errors.length} productos.`));
          }
          resolve();
        } catch (error) {
          console.error("Error al guardar productos en la base de datos:", error);
          reject(new Error("Error al guardar productos."));
        }
      })
      .on("error", (error) => {
        console.error("Error al procesar el archivo CSV:", error);
        reject(new Error("Error al procesar el archivo CSV."));
      });
  });
};

/* Este servicio para traer categorias */
export const categoryService = async (userId: number, categoria: string) => {
  try {
    const products = await ProductModel.find({
      where: {
        user: { id: userId }, // Relación con el usuario
        category: { name: categoria }, // Relación con la categoría
      },
      relations: ["user", "category"], // Asegurar que TypeORM incluya las relaciones
    });   
     return products;
  } catch (error: any) {
    throw new Error(
      `Error al obtener productos por usuario y categoría: ${error.message}`
    );
  }
};

// export const brandService = async (
//   userId: string,
//   categoria: string,
//   marca: string
// ) => {
//   try {
//     const products = await Product.find({ userId, categoria, marca });
//     return products;
//   } catch (error: any) {
//     throw new Error(
//       `Error al obtener productos por usuario y categoría: ${error.message}`
//     );
//   }
// };

export const getProdService = async (userId: string) => {
  try {
    // Convierto el "userId: string" a numero. ya q el id es numerico
    // Busca productos por el ID del usuario
    const products = await ProductModel.find({ where: { user: { id: Number(userId) } }});
    return products;
  
  } catch (error) {
    console.error("Error en getProdService:", error);
    throw new Error("Error al obtener productos.");
  }
};
