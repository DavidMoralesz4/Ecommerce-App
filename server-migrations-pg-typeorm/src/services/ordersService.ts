import { Client } from "../models/Clients";
import { Order } from "../models/Orders";
import { Product } from "../models/Products";

// TODO: Verificar si el cliente con ese ducmento existe***********

export const getOrderService = async (userId: string) => {
  const orders = await Order.find({userId})
    .populate({
      path: "client", // Poblamos el campo client_id
      model: "Client",
      select: "firstName lastName document phone email address", // Seleccionamos las propiedades que queremos mostrar
    })
    .populate({
      path: "order", // Poblamos el campo product_ids
      model: "Product",
      select: "nombre precio descripcion", // Seleccionamos las propiedades de los productos
    });

  return orders;
};

export const createOrderService = async (
  document: string,
  productsAdd: string[],
  userId: string
) => {
  // TODO: Verifivar si el cliente con ese documento no existe, y en caso tal crearlo
  let client = await Client.findOne({ document });

  if (!client) {
    throw new Error("Este cliente no existe, por favor crea uno");
  }

  // TODO: buscar productos por sus IDs
  const products = await Product.find({ _id: { $in: productsAdd } });
  // Aqui busco los productos por id, usando $in
  // TODO: calcular totales de productos
  const total = products.reduce((acc, product) => acc + product.precio, 0);

  // TODO: crear la orden y instanciar el id del documento con el cliente
  const newOrder = new Order({
    client: client._id,
    order: productsAdd,
    status: "Pendiente",
    total,
    userId
  });

  await newOrder.save();
  return newOrder;
};
