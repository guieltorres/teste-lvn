const swaggerUi = require("swagger-ui-express");
import express from "express";
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";
import addressRoutes from "../routes/addressRoutes";
import swaggerSpecs from "../../swagger.json";

function createServer() {
  const app = express();
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  app.use(express.json());

  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
  app.use("/api", addressRoutes);

  return app;
}

export default createServer;
