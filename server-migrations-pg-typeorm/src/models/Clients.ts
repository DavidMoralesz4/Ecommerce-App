import { model, Schema } from "mongoose";

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  document: { type: String, required: true },
  address: { type: String, required: true },
});

export const Client = model("Client", clientSchema);

