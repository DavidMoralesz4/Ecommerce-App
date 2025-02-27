import { AppDataSource, UserModel } from "../config/data-source";

export const getUsersService = async () => {
  try {
    const users = await UserModel.find();

    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const createUsersService = async () => {
  try {
    const usersCreated = await UserModel.create({

    });
    const result = await UserModel.save(usersCreated)

    return 
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
