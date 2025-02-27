import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  unidad: number;
  categoria: string;
  marca: string;
  userId: mongoose.Schema.Types.ObjectId;
   // Relación con el usuario
}

const ProductSchema = new Schema<IProduct>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: {type: String, required: true },
  precio: { type: Number, required: true },
  unidad: { type: Number, required: true },
  categoria: { type: String, required: true },
  marca: { type: String},
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Relación con el usuario
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
