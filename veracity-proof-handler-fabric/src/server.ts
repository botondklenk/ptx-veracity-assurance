import express, { Application } from "express";
import cors from "cors";
import { CONFIG } from "./config/environment";
import { invalidEndpointHandler } from "./middleware/invalidEndpointHandler";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { setupRoutes } from "./routes";
import swaggerSpec from "../docs/proof-handler.swagger.json";
import swaggerUI from "swagger-ui-express";
import { OpenAPI as FabloApiConfig } from "./generated/fablo-client";


export const startServer = async (testPort?: number) => {
  const app: Application = express();
  const port = testPort || CONFIG.port || 3000;
  FabloApiConfig.BASE = CONFIG.fabloUrl;

  app.use(express.json());
  app.use(cors());

  app.get("/health", (_, res) => {
    res.json({ status: "OK" });
  });

  if (CONFIG.environment === 'development') {
    console.log(`Running in developmnent mode`);
    app.use(requestLogger);
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }

  await setupRoutes(app);

  app.use(invalidEndpointHandler);
  app.use(globalErrorHandler);

  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  return { server };
};