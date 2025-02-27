import { Request, Response } from "express";
import { createClientService } from "../services/clientsService";

export const createClientController = async (req: Request, res: Response) => {
  const { firstName, lastName, phone, email, document, address } = req.body;

  try {
    const client = await createClientService(
      firstName,
      lastName,
      phone,
      email,
      document,
      address
    );

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({message: "Error al crear cliente", error})    
  }
};
