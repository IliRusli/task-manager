import cors from "cors";
import { taskRouter } from "./tasks";
import * as middleware from "../utils/middleware";
import * as logger from "../utils/logger";
import { MONGODB_URI } from "../utils/config";
import express from "express";
import mongoose from "mongoose";
export const app = express();

logger.info("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI as string)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/tasks", taskRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
