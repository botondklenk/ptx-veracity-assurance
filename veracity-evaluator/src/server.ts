import express, { Application } from "express";
import cors from "cors";
import { CONFIG } from "./config/environment";
import { invalidEndpointHandler } from "./middlewares/invalidEndpointHandler";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import { setupRoutes } from "./routes";
import swaggerSpec from "../docs/evaluator.swagger.json";
import swaggerUI from "swagger-ui-express";
import { loadMongoose } from "./config/database";


export const startServer = async (testPort?: number) => {
  await  loadMongoose();

  const app: Application = express();
  const port = testPort || CONFIG.port || 3000;

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