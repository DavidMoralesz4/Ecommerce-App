import { authRouter } from "./routes/authRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express'
import { productRouter } from "./routes/productsRouter";
import { clientsRoute } from "./routes/clientsRouter";
import { ordersRoute } from "./routes/ordersRouter";

export const server = express();

const corsOptions = {
    origin: [
    "https://empowering-gentleness-production.up.railway.app",
    "http://localhost:3000",
  ], // Dominios permitidos
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json()); // Middleware / En la app quiero que utilices el express.json()
server.use(cookieParser());

server.use("/api", ordersRoute)
server.use("/api", clientsRoute)
server.use("/api", productRouter);
server.use("/api", authRouter);


