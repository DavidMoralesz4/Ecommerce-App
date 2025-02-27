import { model, Schema } from "mongoose";

const ordersSchema = new Schema({
  date_order: { type: Date, required: true, default: Date.now },
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  order: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  status: {
    type: String,
    enum: ["Pago", "Rechazado", "Pendiente"],
    default: "Pendiente",
    required: true,
  },
  total: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Order = model("Order", ordersSchema);
