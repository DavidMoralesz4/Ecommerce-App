import { AppDataSource } from "./config/data-source";
import { PORT } from "./db/envs";
import { server } from "./server";
import "reflect-metadata";

const connection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database successfully");

    server.listen(PORT, () => {
      console.log(`server running in port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during database connection or server startup:", error);
    process.exit(1)
  }
};

connection();
