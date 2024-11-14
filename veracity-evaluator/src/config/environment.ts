import { config } from "dotenv";
import { mongo } from "mongoose";

config();

export const CONFIG = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/veracity-evaluator",
};