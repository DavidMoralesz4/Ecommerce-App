// import { Client } from "../models/Clients";
// import { Order } from "../models/Orders";
// import { Product } from "../models/Products";

import { In } from "typeorm";
import { ClientModel, OrderModel, OrderProductModel, ProductModel } from "../config/data-source";

// TODO: Verificar si el cliente con ese ducmento existe***********

export const getOrderService = async (userId: number) => {
  const orders = await OrderModel.find({
    where: { user: { id: userId } },
    relations: ["client", "orderProducts", "orderProducts.product"], // cargamos relaciones
    select: {
      dateOrder: true,
      status: true,
      total: true,
      client: {
        email: true,
        document: true,
        address: true,
        phone: true,
        firstName: true,
      },
      orderProducts: {
        quantity: true,
        product: {
          name: true,
          price: true,
          description: true,
        },
      },
    },
  });

  return orders;
};

export const createOrderService = async (
  document: string,
  productsAdd: string[],
  userId: number
) => {
  // TODO: Verifivar si el cliente con ese documento no existe, y en caso tal crearlo
  let client = await ClientModel.findOne({ where: {document}});

  if (!client) {
    throw new Error("Este cliente no existe, por favor crea uno");
  }

  // TODO: buscar productos por sus IDs
  const products = await ProductModel.find({ where: {id: In(productsAdd)}});

  if(products.length === 0 ) {
    throw new Error('No se encontraron productos proporcionados.')
  }
  // TODO: calcular totales de productos
  const total = products.reduce((acc, product) => acc + product.price, 0);

  // TODO: crear la orden e
  const newOrder =  OrderModel.create({
    client,
    status: "Pendiente",
    total,
    user: {id: userId}
  });
  
  await OrderModel.save(newOrder);
  // Crear registros en OrderProduct para asociar productos a la orden
  const orderProducts = products.map((product) =>
    OrderProductModel.create({
      order: newOrder,
      product,
      quantity: 1, // Por defecto, 1 unidad de cada producto (puedes mejorarlo)
    })
  );

  await OrderProductModel.save(orderProducts)
  
  return newOrder;
};
