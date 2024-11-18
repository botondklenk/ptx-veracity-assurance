import { channel } from "diagnostics_channel";
import { config } from "dotenv";

config();

export const CONFIG = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  channel: process.env.CHANNEL || "ptx-veracity",
  chaincode: process.env.CHAINCODE || "veracity-proof-handler",
  fabloUrl: process.env.FABLO_URL || "http://localhost:8801",
};