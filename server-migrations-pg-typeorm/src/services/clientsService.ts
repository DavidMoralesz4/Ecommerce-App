import { ClientModel } from "../config/data-source";

export const createClientService = async (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  document: string,
  address: string
) => {
  try {
    const client = ClientModel.create({
      firstName,
      lastName,
      phone,
      email,
      document,
      address,
    });

     await ClientModel.save(client)
     
     return client
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
