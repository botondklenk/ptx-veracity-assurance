import { config } from "dotenv";
import { mongo } from "mongoose";

config();

export const CONFIG = {
  port: process.env.PORT || 3002,
  environment: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/veracity-evaluator",
  handlerUrl: process.env.HANDLER_URL || "http://localhost:3000",
  handlerUsername: process.env.HANDLER_USERNAME || "admin",
  handlerPassword: process.env.HANDLER_PASSWORD || "adminpw",
};