import { config } from "dotenv";
import { mongo } from "mongoose";

config();

export const CONFIG = {
  port: process.env.PORT || 3002,
  environment: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/veracity-evaluator",
  participant: process.env.PARTICIPANT || "participant1", // id of the participant that is managing the evaluation
  handlerUrl: process.env.HANDLER_URL || "http://localhost:3000",
};