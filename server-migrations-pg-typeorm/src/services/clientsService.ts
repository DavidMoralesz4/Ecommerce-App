import { Client } from "../models/Clients";

export const createClientService = async (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  document: string,
  address: string
) => {
  const client = await Client.create({
    firstName,
    lastName,
    phone,
    email,
    document,
    address,
  });

  return client;
};
