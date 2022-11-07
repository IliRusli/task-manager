import * as logger from "./logger";
import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (request, _response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

export const unknownEndpoint: RequestHandler = (_request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

export const errorHandler = (
  error: Error,
  _request: unknown,
  response: any,
  next: (error: Error) => void
) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "MongoError") {
    return response.status(400).json({
      error: error.message,
    });
  }

  next(error);
};
